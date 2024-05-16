import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function Editor({ data, setData, editorLoaded }) {
    return editorLoaded && (
        <CKEditor
            editor={ClassicEditor}
            config={{
                removePlugins: ['SpellCheck'],
                extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            placeholder={'Please input the description'}
            data={data}
            onReady={(editor) => {
                editor.editing.view.change((writer) => {
                    writer.setAttribute('spellCheck', 'false', editor.editing.view.document.getRoot());
                });
            }}
            onChange={(event, editor) => {
                setData(editor.getData());
            }}
            onBlur={(event, editor) => {
                // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                // console.log('Focus.', editor);
            }}
        />
    ) 
}

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file.then(
            (file) =>
                new Promise(async (resolve, reject) => {
                    const genericErrorText = `Couldn't upload file: ${file.name}.`;
                    const options = {
                        url: 'http://localhost:5000/api/productType/uploadCK',
                        method: 'POST',
                        data: { file: file },
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    };
                    try {
                        const response = await axios.request(options);
                        const result = response.data;
                        if (result.success) {
                            resolve({ default: result.url });
                        }
                    } catch (error) {
                        reject(genericErrorText + ': ' + error);
                    }
                }),
        );
    }
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}
export default Editor;
