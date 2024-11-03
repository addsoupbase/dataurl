'use strict';   
for (let i = 10; --i;) {
    new Elem({
        tag: 'div', class: ['heart'], parent: body, styles: {
            transform: `rotate(${ran.range(0, 360)}deg)`,
            top: `${ran.range(0, 100)}%`,
            left: `${ran.range(0, 100)}%`,
        }
    });
}

function separate(txt) {
    return txt.split('\n').filter(line => line.trim() !== '')
}
let mai = new Elem({
    class: ['pacifico-regular'],
    tag: 'div', parent: body, styles: {
        'overflow-y': 'scroll',
        'height': '95vh',
        'scrollbar-color': '#ff6b81 #FFF',
        width: '100%',
        'justify-items': 'center',
        'text-align': 'center',

    }
})
body.styleMe({
    'justify-content': 'center',
    display: 'flex',
    overflow: 'hidden',
    'background-color': color.dhk('#ff6b81', 10)
})
let asinds = new Elem({
    tag: 'div', parent: mai, id: 'main', styles: {
        'text-align': 'center',
        display: 'inline-grid',
        'margin-left': '30px',
        'margin-right': '30px',

    }
})
let desc = new Elem({ tag: 'h1', parent: asinds, text: 'File → DATAurl' })
new Elem({tag:'a',parent:asinds,
    styles:{
        'font-family':'monospace'
    },text:'View DataURL here',href:'https://addsoupbase.github.io/dataurl/reader'})
new Elem({
    tag: 'button', class: ['huh'], parent: body,
    title: 'Help',
    alt: 'Help',
    text: '?', events: {
        click() {
            hint.show()
            hint.fadeIn()
            this.content.fadeOut(this.content.kill)
        }
    }
})
let input = new Elem({
    class: ['cute-input'],
    tag: 'textarea', styles: {
        width: '300px',
        height: '100px',
    }, parent: 'main', placeholder: 'urls go here, separated by new line (enter key)'
})
let inputButton = new Elem({
    class: ['cute-button'], tag: 'button', text: 'Get from urls (might not work)', parent: 'main', events: {
        click() {
          
            let text = input.value
            if (!text) return input.anim({ class: 'shake' });
            copyAllAsOneBigJSONObjectThing.show()
            copyAllAsOneBigJSONObjectThing.fadeIn()
            loadUrls(separate(text))
        }
    }
})

new Elem({ tag: 'p', parent: 'main', text: 'OR' })
let upload = new Elem({
    events: {
        change(e) {
            copyAllAsOneBigJSONObjectThing.show()
            copyAllAsOneBigJSONObjectThing.fadeIn()
            loadFiles(e.target.files)
        }
    },
    multiple: 'true', tag: 'input', type: 'file',
})
let fileButton = new Elem({
    class: ['cute-button'], tag: 'button', text: 'Files Upload', parent: 'main', events: {
        click() {
            upload.content.click()
        }
    }
})
let copyAllAsOneBigJSONObjectThing = new Elem({
    events: {
        click(){
            navigator.clipboard.writeText(JSON.stringify(asJSON))
        }
    },
    text:"Open all as JSON",tag:'button',class:['cute-button'],parent:'main'})
copyAllAsOneBigJSONObjectThing.hide()
let asJSON = []
let r = new Elem({
    tag: 'div', parent: 'main', id: 'urlresults', styles: {
        'text-align': 'center',
        'height': '400px',
        'margin-bottom': '100px',
        'overflow-y': 'scroll',
        'border-color': '#f99aaa',
        'border-width': '2px',
        'padding': '10px',
        'border-style': 'solid',
        'background-color': `rgb(230, 96, 116)`,
        'scrollbar-color': '#FFFFFF #ff6b81',
        'max-height': '400px'

    }
})
async function loadUrls(urls) {
    for (let o of urls) {
        let data;
        let a = ran.gen(), a2 = ran.gen(), a3 = ran.gen(), a4 = ran.gen(), a5 = ran.gen(), a6 = ran.gen()
        let outer = new Elem({
            tag: 'div',
            parent: r,
            start() {
                this.fadeIn()
            },
            styles: {
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'max-width': '300px',

            },
            children: [
                new Elem({ tag: 'div', class: ['loader'], id: a2 }),
                new Elem({
                    tag: 'div', id: a6, styles: { display: 'grid' }, children: [
                        new Elem({ tag: 'button', class: ['cute-button2', 'cute-button'], text: 'Download', id: a3 }),
                        new Elem({ tag: 'button', class: ['cute-button2', 'cute-button'], text: 'Copy', id: a4 }),
                        new Elem({ tag: 'button', class: ['cute-button2', 'cute-button'], text: 'View', id: a5 }),

                    ]
                })

            ], id: a
        })
        let result = new Elem({ tag: 'p', styles: { 'font-size': '20px' }, text: ``, parent: a })
        try { data = await getDataUrl(o);
            asJSON.push(data)

         }
        catch (e) {
            result.styleMe({ color: 'darkred' })
            result.innerHTML = '(failed)'
            _('#' + a2).kill()
            _('#' + a6).kill()

            continue
        }
        let image = _('#' + a2)

        let download = _('#' + a3)
        download.addevent({
            click() {
                let _blob = new Blob([data], { type: 'text/plain' })
                let link = URL.createObjectURL(_blob)
                let anchor = document.createElement('a')
                anchor.setAttribute('download', 'data.txt')
                anchor.href = link
                document.body.appendChild(anchor)
                anchor.click()
            }
        })
        let copy = _('#'+a4)
        copy.addevent({async click(){
            await navigator.clipboard.writeText(data)
        }})
        result.kill()

        image.removeClass('loader')
        finish({
            data,
            viewButton: _('#' + a5),
            mainContent: image,
            fileName: o

        })
    }

}
async function loadFiles(files) {
    let urls = []
    for (let file of files) {
        let a2 = ran.gen(), a = ran.gen(), a3 = ran.gen(), a4 = ran.gen(), a5 = ran.gen();
        let outer = new Elem({
            tag: 'div',
            parent: r,
            alt: file.name,
            title: file.name,
            start() {
                this.fadeIn()
            },
            styles: {
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'max-width': '300px',

            },
            children: [
                new Elem({ tag: 'div', class: ['loader'], id: a2 }),
                new Elem({
                    tag: 'div', styles: { display: 'grid' }, children: [
                        new Elem({ tag: 'button', class: ['cute-button2', 'cute-button'], text: 'Download', id: a3 }),
                        new Elem({ tag: 'button', class: ['cute-button2', 'cute-button'], text: 'Copy', id: a4 }),
                        new Elem({ tag: 'button', class: ['cute-button2', 'cute-button'], text: 'View', id: a5 }),

                    ]
                }),


            ], id: a
        })
        let reader = new FileReader
        reader.onload = e => {
            let dataUrl = e.target.result
            let out = _(a2)
            asJSON.push(dataUrl)
            out.removeClass('loader')
            let download = _(a3)
            download.addevent({
                click() {
                    let _blob = new Blob([dataUrl], { type: 'text/plain' })
                    let link = URL.createObjectURL(_blob)
                    let anchor = document.createElement('a')
                    anchor.setAttribute('download', 'data.txt')
                    anchor.href = link
                    document.body.appendChild(anchor)
                    anchor.click()
                    this.anim({ class: ['pulsate-bck'] })

                }
            })

            let view = _(a5),
                copy = _(a4)
            copy.addevent({
                click: async function () {
                    await navigator.clipboard.writeText(dataUrl)
                    this.anim({ class: ['pulsate-bck'] })
                }
            })
            finish({
                data: dataUrl,
                viewButton: view,
                mainContent: out,
                fileName: file.name

            })
        }
        reader.readAsDataURL(file)
    }

}
let hint = new Elem({ tag: 'div', id: 'hint', parent: body })
new Elem({ tag: 'p', parent: hint, text: 'DataURLs can be used to save images and other files as plain text and use them directly in HTML and CSS. This tool makes it quick and easy to convert them to DataURLs' })
new Elem({
    tag: 'button', class: ['cute-button'], text: 'OK', parent: hint, events: {
        click() {
            hint.fadeOut(hint.hide)
        }
    }
})
hint.hide()
function finish({ data, viewButton, mainContent, fileName }) {
    if (data.match(/image\/(webp|jpg|jpeg|png|svg|gif|apng|avif|bmp|ico|tiff)/)) {
        viewButton.addevent({
            click() {
                let w = open()
                let f = w.document.createElement('img')
                f.src = data
                w.document.body.appendChild(f)
                this.anim({ class: ['pulsate-bck'] })

            }
        })
        mainContent.styleMe({
            'border-color': 'black',
            'border-width': '2px',
            'border-style': 'solid',
            'background-repeat': 'no-repeat',
            'margin': '40px',
            'background-size': 'contain', 'background-image': `url("${data}")`, width: '100px', height: '100px'
        })
    } else {
        let nelem;
        let text = false;
        if (data.match(/audio\/(mp3|3pg|adts|flac|ogg)/)) {

            nelem = new Elem({
                tag: 'audio', controls: true, autobuffer: true, children: [
                    new Elem({ tag: 'source', src: data })
                ]
            })
        }
        else if (data.match(/video\/(webm|mp4|mpeg|mov)/)) {
            nelem = new Elem({
                tag: 'video', controls: true, autobuffer: true, children: [
                    new Elem({ tag: 'source', src: data })
                ]
            })
        }
        else {
            nelem = new Elem({
                tag: 'pre',
                readonly: 'true', styles: {
                    width: '300px',
                    height: '300px',
                }
            })
            nelem.content.setAttribute('readonly', true)
            nelem.textContent = atob(data.split(',').pop())
        }

        mainContent.replaceWith(new Elem({ tag: 'kbd', text: `.${utilString.shorten(fileName.split('.').pop(), 4)} file` }))
        viewButton.addevent({
            click() {
                let win = open()
                //     let clone = nelem.clone(true).content
                win.document.body.appendChild(nelem.content)
            }
        })
    }
}
