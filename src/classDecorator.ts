function CustomPropertyDecorator(): PropertyDecorator {
  return (target: Object, propertyName: string | symbol) => {
    console.log(target) // {}
    // console.log(propertyName) // userName

    Object.defineProperty(target.constructor, propertyName, {
      configurable: true,
      writable: true,
      enumerable: false,
      value: function () {
        console.log('test')
        return 'test'
      },
    })
  }
}

function CustomMethodDecorator(info: string): MethodDecorator {
  return (
    target: Object,
    methodName: any,
    propertyDescriptor: PropertyDescriptor
  ) => {
    console.log(target) // { sayHello: [Function (anonymous)] }
    console.log(methodName) //sayHello

    let originMethod = propertyDescriptor.value

    propertyDescriptor.value = function (...args: any) {
      console.log('before')
      console.log('我' + info + '来了') //我马东锡来了
      originMethod.call(this, args)
      console.log('after')
    }
  }
}

class Demo {
  @CustomPropertyDecorator
  public userName!: string
  constructor() {
    console.log('demo')
  }
  @CustomMethodDecorator('马东锡')
  sayHello() {
    console.log('执行sayHello()方法)')
  }
}

const demo = new Demo()
console.log(demo)
console.log(demo.userName)
demo.sayHello()
