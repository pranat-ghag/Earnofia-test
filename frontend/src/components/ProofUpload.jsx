import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Form, Button, ProgressBar } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function ProofUpload({ eventId }){
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(0);
  const inputRef = useRef();

  const submit = async () => {
    if(!file) return toast.error('Choose a file');
    const fd = new FormData();
    fd.append('proof', file);
    fd.append('name', name);
    const base = process.env.REACT_APP_API || 'http://localhost:5000';
    try{
      await axios.post(base + '/api/proofs/' + eventId, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e)=> setProgress(Math.round((e.loaded / e.total) * 100))
      });
      toast.success('Proof uploaded');
      setFile(null); setName(''); setProgress(0);
      if(inputRef.current) inputRef.current.value = null;
    }catch(err){ toast.error('Upload failed'); setProgress(0); }
  };

  return (
    <div>
      <Form.Group className="mb-2"><Form.Label>Your name</Form.Label><Form.Control value={name} onChange={e=>setName(e.target.value)} placeholder="Your display name" /></Form.Group>
      <div className="border rounded p-3 mb-2 text-center" style={{cursor:'pointer', background:'rgba(255,255,255,0.02)'}} onClick={()=> inputRef.current && inputRef.current.click()}>
        {file ? <div>{file.name}</div> : <div className="text-muted">Click to select or drag & drop image/video</div>}
        <input ref={inputRef} type="file" accept="image/*,video/*" className="d-none" onChange={e=>setFile(e.target.files[0])} />
      </div>
      {progress>0 && <ProgressBar now={progress} label={`${progress}%`} className="mb-2"/>}
      <Button className="mt-2" onClick={submit}>Upload Proof</Button>
    </div>
  );
}
