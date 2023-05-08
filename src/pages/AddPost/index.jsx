/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import instance, { baseURL } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const AddPost = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false );
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const inputRef = useRef(null);

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      instance.get('/posts/' + id).then(({ data}) => {
        setValue(data.text);
        setTitle(data.title);
        setTags(data.tags.join(','));
        setImageUrl(data.imageUrl);
      })
    }
  }, [])


  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image', file)

      const { data } = await instance.post('/upload', formData);

      console.log(data);

      setImageUrl(data.url);
    } catch (error) {
      console.warn(error)
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl(' ')
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const onSubmit  = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        text: value,
      }

      let _id;

     if (isEditing) {
      _id = id;
       await instance.patch('/posts/' + _id, fields);

     } else {
      const { data } = await instance.post('/posts', fields);
       _id = data._id;
     }



      navigate('/posts/' + id);

    } catch (error) {
      console.warn(error);
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputRef.current.click() } variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`${baseURL}${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField value={tags}        onChange={(e) => setTags(e.target.value)}
 classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
