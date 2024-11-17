import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './CombinedEditor.module.css';

const RichTextEditor = ({ value, onChange }) => {
    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            className={styles.customQuill} 
            theme="snow"
            placeholder="Viết văn bản ở đây..."
            modules={{
                toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ align: [] }],
                    [{ color: [] }, { background: [] }],
                    ['link', 'image'],
                    ['clean'],
                    ['code-block'],
                ],
            }}
            formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
                'color',
                'background',
                'align',
                'code-block',
            ]}
        />
    );
};

export default RichTextEditor;
