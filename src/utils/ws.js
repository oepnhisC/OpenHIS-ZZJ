
export function createWebSocket(url) {
    let socket = null 
    const queue = []
    let isConnected = false 
   
    function connect() {
      socket = new WebSocket(url)
      socket.onopen  = () => {
        console.log('WebSocket 已连接')
        isConnected = true 
        queue.forEach(msg  => socket.send(msg)) 
        queue.length  = 0 
      }
      socket.onclose  = () => {
        console.log('WebSocket 已断开')
        isConnected = false 
        setTimeout(connect, 1000) // 1秒后自动重连 
      }
    }
   
    connect()
   
    return {
      send: (data) => {
        const msg = JSON.stringify(data) 
        isConnected ? socket.send(msg)  : queue.push(msg) 
      },
      onMessage: (callback) => {
        socket.onmessage  = (e) => callback(JSON.parse(e.data)) 
      }
    }
  }