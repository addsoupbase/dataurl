'use strict';
let main = new Elem({
    tag: 'div', parent: body, styles: {
        'text-align': 'center'
    }
})
let file;
new Elem({
    tag: 'h1', text: 'DataURL Reader', parent: main, class: ['pacifico-regular'], styles: {
        'font-weight': 'bold'
    }
})
let force = new Elem({tag:'input',parent:main,class:['cute-input'],placeholder:'Force file extension?'})

let div = new Elem({ tag: 'div', parent: main })
let upload = new Elem({
    tag: 'button', class: ['cute-button'], parent: div,
    events: {
        click() {
            file.content.click()
            err.hide()
        }
    },
    text: 'Upload', children: [
        file = new Elem({
            events: {
            
                change(a) {

                    let f = (a.target.files[0])
                    let reader = new FileReader
                    let foe = force.value
                   
                    reader.onload = data => {
                        let text = data.target.result
                      
                        if (!text.startsWith('data')) {
                            err.show()
                            return err.anim({class:'shake'})
                        }
                        let filetype = text.split(';')[0].replace('data:', '').split('/')[1]
                        if (foe) {
                        text = text.replace(filetype,foe)
                        }
                        let blob = dataURLToBlob(text)
                        let url = URL.createObjectURL(blob).trim()
                        let win = open(url)
                        let element;
                       /* if (filetype.match(Elem.formats.image)) {
                            element = document.createElement('img')
                            element.src = url
                        }
                        else if (filetype.match(Elem.formats.video)){ 
                            element = document.createElement('video')
                            element.controls = true
                            element.preload='auto'
                            element.autoplay=true
                            let source = document.createElement('source')
                                source.src = url
                                source.type = filetype
                                element.appendChild(source)
                            
                        }
                        else if (filetype.match(Elem.formats.audio)){ 
                            element = document.createElement('audio')
                            element.controls = true
                            element.preload='auto'
                            element.autoplay=true
                            let source = document.createElement('source')
                                source.src = url
                                source.type = filetype
                                element.appendChild(source)
                            
                        }*/
                        //win.document.body.appendChild(element)

                       // alert(img.src)
                        element.onload = () => URL.revokeObjectURL(url)

                    }
                    reader.readAsText(f)
                }
            },
            tag: 'input', type: 'file', styles: {
                display: 'none'
            }
        })
    ]
})
let err = new Elem({tag:'p',text:'Invalid URL',parent:main,start(){this.hide()}})

function dataURLToBlob(dataUrl) {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)[1]; // Extract mime type
    const binary = atob(parts[1]); // Decode Base64
    const array = [];

    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: mime });
}