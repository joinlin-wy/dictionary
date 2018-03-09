const connectServer = require('./connect')
const curd = require('./CURD')
const operate = require('./operate')

const mongodb = {
    client: null,
    operate: null,
    connect: async function () {
        try {
            let client = await connectServer()
            this.client = client
            this.operate = operate(client)
        } catch (e) {
            console.error(e)
        }
        return
    },
    curd: curd
}
module.exports = mongodb