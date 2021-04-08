//电话号码隔位显示,344
const numTransform = phoneNum => {
  return (
    phoneNum.slice(0, 3) + ' ' + phoneNum.slice(3, 7) + ' ' + phoneNum.slice(7)
  );
};

console.log(numTransform('15521209090'));
