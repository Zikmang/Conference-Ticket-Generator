import uploadIcon from "../assets/images/icon-upload.svg";
import infoIcon from "../assets/images/icon-info.svg";
import { useState } from "react";

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
  const [valid, setValid] = useState(false)
  return (
    <form onSubmit={onSubmit}>
      {/* Upload */}
      <div className="upload-avatar">
        <label htmlFor="avatar-upload">Upload Avatar</label>

        <div className="drop-zone" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
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
              <div className="upload-icon-box">
                <img src={uploadIcon} alt="" />
              </div>
              <p>Drag and drop or click to upload</p>
            </>
          ) : (
            <div className="image-preview">
              <img src={avatarPreview} alt="Preview" />
              <div className="avatar-buttons">
                <button type="button" onClick={onRemoveImage}>
                  Remove image
                </button>
                <button type="button" onClick={onChangeImage}>
                  Change image
                </button>
              </div>
            </div>
          )}
        </div>

        {uploadError ? (
          <span className="upload-error">
            <div><img style={{width: '20px'}} src={infoIcon} alt="" /></div>
            <div><p>{uploadError}</p></div>
          </span>
        ): 
          <span className="sub-info">
            <div><img style={{width: '20px'}} src={infoIcon} alt="" /></div>
            <div><p>Upload your photo (JPG or PNG, max size: 500KB)</p></div>
          </span>
        }
      </div>

      {/* Name */}
      <div>
        <label>Full Name</label>
        <div>
        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onBlur={() => {
            onFieldError("nameError")
          }}
          className={errors.nameError && !name ? "error" : ""}
        />
        </div>
        {(errors.nameError && !name ) && (
          <span className="error-msg">
            <div><img style={{width: '20px'}} src={infoIcon} alt="" /></div>
            <div><p>This field is Required</p></div>
          </span>
        )}
      </div>

      {/* Email */}
      <div>
        <label>Email Address</label>
        <div>
        <input
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onBlur={() => onFieldError("emailError")}
          className={(errors.emailError && (email.trim() === "" || !email.includes('@'))) ? "error" : ""}
        />
        </div>
        {(errors.emailError && (email.trim() === "" && !email.includes('@'))) && (
          <span className="error-msg">
            <div><img style={{width: '20px'}} src={infoIcon} alt="" /></div>
            <div><p>Please enter a valid email address</p></div>
          </span>
        )}
      </div>

      {/* GitHub */}
      <div>
        <label>GitHub Username</label>
        <div>
        <input
          value={github}
          onChange={(e) => onGithubChange(e.target.value)}
          onBlur={() => onFieldError("gitError")}
          className={(errors.gitError && (github.trim() === '' || !github.startsWith('@'))) ? "error" : ""}
        />
        </div>
        {(errors.gitError && (github.trim() === '' || !github.startsWith('@'))) && (
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
