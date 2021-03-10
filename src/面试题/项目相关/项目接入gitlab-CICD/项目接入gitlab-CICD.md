# 项目接入gitlab-CICD

项目达到一定规模之后，接入CICD可以提高我们的开发、持续集成、持续部署的效率，以及保证代码质量等，只有通过了所有检测流程的流水线可以进行部署。

## .gitlab-ci.yml配置

yaml的语法很简单，通过缩进和冒号来表达键值对的值。

现场服务器有AMD和ARM的，所以需要分两种job的执行镜像、runner执行的tags以及部署镜像。

- 指定job执行的镜像，用的是harbor里的node镜像，有AMD版本和ARM版本
- 给job指定tags，项目中分为amd和arm用于特定的runner执行任务

- 流水线(pipeline)氛围4个stage，分别是：
  1. **install**：安装项目依赖
  2. **code_quality**：用于进行代码质量检测，包含checkTs及eslint
  3. **build**：项目构建。这里配置了`artifacts`，打包后的静态资源可以通过页面UI点击下载
  4. **build_image_and_push**：拉取云平台开发的ci-tool，进行镜像的构建及推送到镜像仓库(harbor)。用于后续TPP测试发布平台进行打包

variables下记得配置CI:'false'，否则默认只要项目中出现warning流水线就会停止(我们项目里有很多warning)

### 优化

- 配置缓存及缓存策略：

  ```ya
  cache:
    paths:
      - node_modules
  ```

  在不同job和目录之间共享node_modules缓存。

  除了install这个stage的job都配置了cache:policy，用来跳过缓存的提交，不更新缓存。

  ```
    cache:
      policy: pull
  ```

- 配置git clean：

  ```
  GIT_CLEAN_FLAGS: -ffdx -e node_modules
  ```

  同个目录不同job切换时保留node_modules。(项目配置了并行流水线，所以这个可能就没啥作用了。但是加了hard-source-webpack-plugin之后又有用了)

- gitlab-runner开启并发(parallel)模式，并且配置流水线目录，可以并发执行流水线任务，不会因为连续多个commit而阻塞到后面的commit：

  ```
  GIT_CLONE_PATH: $CI_BUILDS_DIR/runner-${CI_RUNNER_ID}-concurrent-${CI_CONCURRENT_PROJECT_ID}/${CI_PROJECT_PATH}
  
  # $CI_BUILDS_DIR为流水线构建目录
  # ${CI_RUNNER_ID}为跑job的runner的id
  # ${CI_CONCURRENT_PROJECT_ID}流水线并发任务的id，如果前面没有正在执行的流线的话，则为0，如果
  # 前面有在执行的流水线的话则依次递增
  # ${CI_PROJECT_PATH} 项目的git仓库地址，在这里为platform/aios-platform-web/.git/
  ```

- 当使用hard-source-webpack-plugin时，不同分支之间由于交替使用gitlab-runner的原因，会导致无法命中缓存，所以通过固定分支使用特定的单一runner来达到使用相同的构建目录以达到复用缓存的目的。

## 宿主机地址挂载

build_ci/config.yml中配置了`mount: /opt/aios-web/upload:/usr/share/nginx/aios-platform-web/upload`。告诉容器将项目根目录下的upload挂载到宿主机上/opt/aios-web/upload上，这是因为后端把前端上传的文件都放在了这个位置(我也不知道后端为什么要这样设计)。通过这种方式，我们才可以在容器内监听的nginx端口转发到对应的位置拿到正确的资源，否则由于`$try_files`指令的存在会一直拿到index.html，反映到前端最常见就是就是裂图。

## nginx配置及部署脚本

### 部署脚本

通过在build_ci/dep_pkg.yml使用云平台提供的nginx镜像，云平台在里面提供了最简单的nginx配置，由于我们是通过反向代理解决跨域的，所以不合我们的要求，我们需要自己定制nginx配置文件以方便修改nginx配置，所以在项目public下增加了custom.conf配置文件，在打包的时候通过在/build_ci/deploy.sh中编写部署脚本，删掉nginx镜像中自带的一个配置文件(没办法，用不上，加我们配置又会冲突)，并且把自己编写的配置文件挪到对应的位置，并用容器的真实ip地址替换掉配置文件中的地址`127.0.0.1`，(使用容器部署和直接宿主机部署的不同就在于如果把接口转发给127.0.0.1会向容器内转发，后端接收不到，所以需要配置真实的地址)。

### nginx配置

提供了最基础的：

- `$try_files`配置，前端路由必备
- 静态资源(js,css等)的强缓存和index.html的协商缓存
- 后台接口转发(解决跨域)
- gzip

## 云平台离线部署流程

在TPP测试发布平台上进入算法仓前端项目进行离线打包，将打包的文件下载后到CMP上新增应用即可。

