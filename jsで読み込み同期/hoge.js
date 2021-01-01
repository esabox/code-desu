console.log('hoge1')
const js = 'fuga.js'



funArr = [
  function() {
    document.write('<script src=' + js + '><\/script>')
  },
  function() {
    const s = document.createElement('script')
    s.async = false
    s.src = js
    document.head.appendChild(s)
  },
  function() {
    var request = new XMLHttpRequest()
    request.open('GET', js, false)
    request.send(null)

    if (request.status === 200) {
      var script = document.createElement('script')
      script.text = request.responseText
      document.head.appendChild(script)
    }
  },
  function() {
    const loadScript = obj => {
      const elem = Object.assign(document.createElement('script'), obj, {
        defer: false,
        async: false,
        type: 'module',
      })
      document.head.append(elem)
    }
    loadScript({src: js})
  },
  //function() {},
]
funArr[3]()


console.log('hoge2')
