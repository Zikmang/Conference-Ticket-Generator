import { useState, useEffect, useRef } from "react";

import lines from "./assets/images/pattern-lines.svg";
import circles from "./assets/images/pattern-circle.svg";
import squigglyTop from "./assets/images/pattern-squiggly-line-top.svg";
import squigglyBottom from "./assets/images/pattern-squiggly-line-bottom-desktop.svg";

import Header from "./components/Header";
import Form from "./components/Form";
import SuccessCard from "./components/SuccessCard";

import "./App.css";

const App = () => {
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    gitError: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef(null);

  /*  Validation  */

  function validateForm() {
    let isValid = true;

    const newErrors = {
      nameError: false,
      emailError: false,
      gitError: false,
    };

    if (name.trim() === "") {
      newErrors.nameError = true;
      isValid = false;
    }

    if (email.trim() === "" || !email.includes("@")) {
      newErrors.emailError = true;
      isValid = false;
    }

    if (github.trim() === "" || !github.startsWith("@")) {
      newErrors.gitError = true;
      isValid = false;
    }

    if (!avatar) {
      setUploadError("Please upload an avatar.");
      isValid = false;
    } else {
      setUploadError("");
    }

    setErrors(newErrors);
    return isValid;
  }

  /* Handlers */

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitted(true);
  }

  function handleFieldError(field) {
    setErrors((prev) => ({ ...prev, [field]: true }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setUploadError("Invalid file format. JPG or PNG only.");
      return;
    }

    if (file.size > 500 * 1024) {
      setUploadError("File is too large. Max size is 500KB.");
      return;
    }

    setUploadError("");
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  }

  function removeImage() {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatar(null);
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function changeImage() {
    fileInputRef.current?.click();
  }

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  /* Render */

  return (
    <div>
      <img src={lines} className="line" alt="" />
      <img src={circles} className="circle" alt="" />
      <img src={squigglyTop} className="squiggly-top" alt="" />
      <img src={squigglyBottom} className="squiggly-bottom" alt="" />

      <div className="container">
        

        {!submitted ? (
          <>
          <Header />
          <Form
            avatarPreview={avatarPreview}
            uploadError={uploadError}
            name={name}
            email={email}
            github={github}
            errors={errors}
            fileInputRef={fileInputRef}
            onSubmit={handleSubmit}
            onNameChange={setName}
            onEmailChange={setEmail}
            onGithubChange={setGithub}
            onFieldError={handleFieldError}
            onFileChange={handleFileChange}
            onDrop={handleDrop}
            onRemoveImage={removeImage}
            onChangeImage={changeImage}
          />
          </>
        ) : (
          <SuccessCard
            name={name}
            email={email}
            github={github}
            avatarPreview={avatarPreview}
          />
        )}
      </div>
    </div>
  );
};

export default App;
