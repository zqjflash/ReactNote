/**
 * Created by lhy on 2018/12/6.
 */
window.globalContainer = [];
window.containerInfoStack = [];
window.fiberStackTest = []
function formatMoney(str) {
    str = str + ''
    if (/[^0-9.]/.test(str)){
        return "0.00"
    }
     // 找到小数点的下标
     let pointIdx = str.indexOf('.')
     // 如果没有小数点
     if (pointIdx < 0) {
         // 将数值进行千位符转换
       str = str.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
     } else { // 如果有小数点
         // 取整数部分, 也可以用 parseInt
       let int = str.substr(0, pointIdx)
       // 整数部分进行千位符转换
       str = int.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + str.substr(pointIdx)
     }
    return str 
}

function testInputComponent(){
    class APP extends React.Component{
        static getDerivedStateFromProps(){
            console.log('APP getDerivedStateFromProps');
            return {}
        }
        constructor(props){
            super(props)
            this.state = {

            }
        }
        componentDidMount(){
            console.log('APP componentDidMount');
        }
        render(){
            console.log("APP render")
            return (
                <div>
                    <Footer/>
                </div>
            )
        }
    }

    class Footer extends React.Component{
        static getDerivedStateFromProps(){
            console.log('Footer getDerivedStateFromProps');
            return {}
        }
        constructor(props){
            super(props)
            this.state = {
                amount: ''
            }
        }
        changeValue(e){
            let that = this
            let amount = e.target.value
                .replace(/^0/, '') // 第一个不能为 0
                .replace(/[^\d\.]/g, '') //如果输入非数字，则替换为''
                .replace(/^\./g,'') //必须保证第一个为数字而不是 .  
                .replace('.','$##$').replace(/\./g,'').replace('$##$','.') //保证.只出现一次，而不能出现两次以上 
                .replace(/^(\d+)\.(\d\d).*$/,'$1.$2') // 最多两位小数
            amount = formatMoney(amount)
            setTimeout(()=>{
                that.setState({
                    amount: amount
                })
            },100)
        }
        componentDidMount(){
            console.log('Footer componentDidMount');
        }
        render(){
            console.log("Footer render")
            return (
                <div>
                    <input 
                        onInput={(e) => {
                            this.changeValue(e)
                        }}
                        value = {this.state.amount}
                    ></input>
                </div>
            )
        }
    }
    ReactDOM.render(
        <APP/>,
        document.getElementById('app')
    );
}
testInputComponent()

