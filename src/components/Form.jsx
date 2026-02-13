import uploadIcon from "../assets/images/icon-upload.svg";
import infoIcon from "../assets/images/icon-info.svg";
import { motion } from "framer-motion";

const Form = ({
  avatarPreview,
  uploadError,
  name,
  email,
  github,
  errors,
  fileInputRef,
  onSubmit,
  onNameChange,
  onEmailChange,
  onGithubChange,
  onFieldError,
  onFileChange,
  onDrop,
  onRemoveImage,
  onChangeImage,
}) => {

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  };

  const isNameError = errors.nameError && !name;
  const isEmailError = errors.emailError && (email.trim() === "" || !email.includes('@'));
  const isGithubError = errors.gitError && (github.trim() === '' || !github.startsWith('@'));

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="upload-avatar">
        <label htmlFor="avatar-upload">Upload Avatar</label>

        <motion.div 
          className="drop-zone" 
          onDragOver={(e) => e.preventDefault()} 
          onDrop={onDrop}
          animate={uploadError ? shakeAnimation : {}}
        >
          <input
            ref={fileInputRef}
            id="avatar-upload"
            type="file"
            accept="image/png, image/jpeg"
            className="upload-input"
            onChange={onFileChange}
            style={{ pointerEvents: avatarPreview ? "none" : "auto" }}
          />
          {!avatarPreview ? (
            <>
              <div className="upload-icon-box"><img src={uploadIcon} alt="" /></div>
              <p>Drag and drop or click to upload</p>
            </>
          ) : (
            <div className="image-preview">
              <img src={avatarPreview} alt="Preview" />
              <div className="avatar-buttons">
                <button type="button" onClick={onRemoveImage}>Remove image</button>
                <button type="button" onClick={onChangeImage}>Change image</button>
              </div>
            </div>
          )}
        </motion.div>

        {uploadError ? (
          <span className="upload-error">
            <div><img style={{width: '20px'}} src={infoIcon} alt="" /></div>
            <div><p>{uploadError}</p></div>
          </span>
        ) : (
          <span className="sub-info">
            <div><img style={{width: '20px'}} src={infoIcon} alt="" /></div>
            <div><p>Upload your photo (JPG or PNG, max size: 500KB)</p></div>
          </span>
        )}
      </div>

    
      <div>
        <label>Full Name</label>
        <motion.div animate={isNameError ? shakeAnimation : {}}>
          <input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={() => onFieldError("nameError")}
            className={isNameError ? "error" : ""}
            style={{ width: '100%' }}
          />
        </motion.div>
        
        {isNameError && (
          <span className="error-msg">
            <div><img style={{width: '20px'}} src={infoIcon} alt="" /></div>
            <div><p>This field is Required</p></div>
          </span>
        )}
      </div>

      <div>
        <label>Email Address</label>
        <motion.div animate={isEmailError ? shakeAnimation : {}}>
          <input
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={() => onFieldError("emailError")}
            className={isEmailError ? "error" : ""}
            style={{ width: '100%' }}
          />
        </motion.div>

        {isEmailError && (
          <span className="error-msg">
            <div><img style={{width: '20px'}} src={infoIcon} alt="" /></div>
            <div><p>Please enter a valid email address</p></div>
          </span>
        )}
      </div>
      
      <div>
        <label>GitHub Username</label>
        <motion.div animate={isGithubError ? shakeAnimation : {}}>
          <input
            value={github}
            onChange={(e) => onGithubChange(e.target.value)}
            onBlur={() => onFieldError("gitError")}
            className={isGithubError ? "error" : ""}
            style={{ width: '100%' }}
          />
        </motion.div>

        {isGithubError && (
          <span className="error-msg">
            <div><img style={{width: '20px'}} src={infoIcon} alt="" /></div>
            <div><p>Wrong Format</p></div>
          </span>
        )}
      </div>

      <button type="submit">Generate My Ticket</button>
    </form>
  );
};

export default Form;