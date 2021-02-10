# Gitlab CI/CD

## 概念

Gitlab中给我们提供了了CI/CD(持续集成、持续交付、持续部署)的能力，我们可以在.gitlab-ci.yml中配置或者在Gitlab的 CI/CD面板进行设置。

主要配置都在.gitlab-ci.yml中进行配置。

.gitlab-ci.yml是在项目根目录中的一个用yaml语法编写的文件，Gitlab通过识别这个文件中的内容触发特定行为。

## 不能用作job名的保留关键字

.gitlab-ci.yml中有一些保留关键字，不能用作job名，它们有别的用途。其他的值均作为job名

```
image //镜像
services//服务
stages //阶段
types 
before_script //每个job之前运行
after_script//每个job之后运行
variables//环境变量
cache//缓存
include
```

### image

指定job在什么镜像上跑，可以全局设置，也可以在每个job里设置image，job里的会覆盖全局的。

### before_script

指定在每个job执行之前要执行的命令。可以被job里的before_script覆盖。

### after_script

指定在每个job执行之后要执行的命令。可以被job里的after_script覆盖。

### stages

值为数组，用来定义流水线的各个阶段(stage)的名称及顺序。

1. 相同阶段(stage)的job并行执行(in parallel)
2. 下一个阶段的jobs要在上一个极端的jobs完全执行并全部成功之后才会开始

```
stages:
  - build
  - test
  - deploy
//流水线有三个阶段，三个阶段名称分别为build、test、deploy
//build阶段的jobs并行执行，全部成功后执行test阶段的jobs
//test阶段的jobs并行执行，全部成功后执行deploy阶段的jobs
//deploy阶段的jobs并行执行，全部成功后标记为passed
//如果有某个阶段的job失败了，则标记为failed，且后面阶段的jobs不执行
```

## Jobs

在全局范围内定义的键值对，在不使用保留关键字的情况下，键名就是job的名称，键值就是job的值。大部分的流水线设置都在job中。

### only/except 主要用法

- only定义了job会执行的分支(branches)和标签(tags)
- except定义了job不会执行的分支(branches)和标签(tags)

except没有默认值。only的默认值为`only: ['branches', 'tags']`，也就是所有分支和打了标签的都会执行。

#### only:refs/except:refs

最常见用法，指定特定的分支执行job或者不执行

```
deploy:
  only:
    refs:
      - master
      - schedules
```

#### only:variables/except:variables

高级用法，当满足一些变量条件时执行或者不执行

**当variables里的值有一个为真时，only/except会被触发**

```
deploy:
  script: cap staging deploy
  only:
    refs:
      - branches
    variables:
      - $RELEASE == "staging"
      - $STAGING
```

```
end-to-end:
  script: rake test:end-to-end
  except:
    variables:
      - $CI_COMMIT_MESSAGE =~ /skip-end-to-end-tests/
```

#### only:changes/except:changes

高级用法，当满足一些文件变更时，执行或者不执行

```
docker build:
  script: docker build -t my-image:$CI_COMMIT_REF_SLUG .
  only:
    changes:
      - Dockerfile
      - docker/scripts/*
      - dockerfiles/**/*
      - more_scripts/*.{rb,py,sh}
```

### rules

允许一些规则按照顺序计算出值，直到有一个匹配了或者动态提供了属性给job

rules中可以包含的rule：

- **if**：和`only:variables`用法相似
- **changes**：和`only:changes`用法相似
- **exists**

```
job:
  script: "echo Hello, Rules!"
  rules:
    - if: '$CI_MERGE_REQUEST_TARGET_BRANCH_NAME == "master"'
      when: always
    - if: '$VAR =~ /pattern/'
      when: manual
    - when: on_success
    
#如果第一个rule匹配，job会获得一个when:always属性
#如果第一个不匹配，第二个和第三个按需计算直到有一个匹配的。
#如果第二个不匹配，第三个一定会匹配因为它没有条件判断。
```

#### rules:exists

接收一组路径，只要仓库中匹配到了任何一个路径，就满足条件。

```
job:
  script: docker build -t my-image:$CI_COMMIT_REF_SLUG .
  rules:
    - exists:
      - Dockerfile
```



### tags

tags用来指定那些runner来执行这个job。(runner注册的时候会打伤一个标签，只有job的tags有这个runner的标签，这个runner才有机会执行这个job)。

#### allow_failure

allow_failure值指定job是否允许失败，默认为false，失败后流水线停止，并标记为红色的failed。当设置为true时，允许失败，如果失败了，会有橙色的警告UI展示，并且当前job的结果会判断为成功，不会阻塞后面。

### when

when用于设置当前的job是否执行以及如何执行

when可以设置为以下的值：

- on_success：默认值。只有当前面所有的job都成功了才执行
- on_failure：前面至少有一个job失败了才执行
- always：无论前面的不管前面的job结果如何都执行
- manual：手动在UI界面上点击执行才执行
- delayed：过一段时间再执行









## Runners

当使用自定义Runners的时候，Gitlab Runner默认同时只会执行一个job。

jobs只有以下两种情况会并行执行：

- 跑在不同runners上
- Runner的concurrent设置被改变了

## cache

cache用来指定哪些文件和目录在job之间需要缓存。

如果cache在job之外的全局定义的话，说明所有的job都会使用该缓存，当在job中定义缓存的时候，会覆盖全局的缓存配置。

### cache:paths

指定要缓存的文件/文件夹路径，路径时相对于项目目录的。

### cache:key

由于缓存是job间共享的，所以如果不同的job之间缓存了不同路径的话，就会发生覆盖，所以需要使用cache:key来防止覆盖。

默认值为`cache:default`，表示所有缓存都会在流水线和job之间共享。

## artifacts

artifacts用来指定哪些文件和目录应该附属于job。artifacts会在job完成之后发送给gitlab并且可以在UI界面上点击下载。

### artifacts:paths

指定作为附件可以下载的路径。

## dependencies

默认之前stage的artifacts会往后传，可以用dependencies来定义从哪些job可以获取到artifacts。

## extends

extends定义了一个job可以继承的配置













