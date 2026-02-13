import lines from "./assets/images/pattern-lines.svg";
import circles from "./assets/images/pattern-circle.svg";
import squigglyTop from "./assets/images/pattern-squiggly-line-top.svg";
import squigglyBottom from "./assets/images/pattern-squiggly-line-bottom-desktop.svg";

import Header from "./components/Header";
import Form from "./components/Form";
import SuccessCard from "./components/SuccessCard";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

import useImageUpload from "./hooks/useImageUpload";
import { useFormLogic } from "./hooks/useFormLogic";


const App = () => {
  const { 
    avatar, avatarPreview, uploadError, fileInputRef, 
    onFileSelect, onDrop, removeImage, triggerFileInput 
  } = useImageUpload();

  const { 
    formData, errors, submitted, handleChange, handleSubmit 
  } = useFormLogic(avatar);

  return (
    <div>
      {/* Background images... */}
      <img src={lines} className="pattern-lines" alt="" />
      <img src={circles} className="pattern-circle" alt="" />
      <img src={squigglyTop} className="pattern-squiggly-top" alt="" />
      <img src={squigglyBottom} className="pattern-squiggly-bottom" alt="" />
      
      <div className="container">
        {/* AnimatePresence allows components to animate OUT when removed */}
        <AnimatePresence mode="wait"> 
          
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Header />
              <Form
                 // ... pass all your props here just like before ...
                 avatarPreview={avatarPreview}
                 uploadError={uploadError || errors.uploadError}
                 fileInputRef={fileInputRef}
                 onFileChange={onFileSelect}
                 onDrop={onDrop}
                 onRemoveImage={removeImage}
                 onChangeImage={triggerFileInput}
                 name={formData.fullName}
                 email={formData.email}
                 github={formData.github}
                 errors={errors}
                 onNameChange={(val) => handleChange("fullName", val)}
                 onEmailChange={(val) => handleChange("email", val)}
                 onGithubChange={(val) => handleChange("github", val)}
                 onFieldError={() => {}}
                 onSubmit={handleSubmit}
              />
            </motion.div>
          ) : (
            <motion.div
              key="ticket"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <SuccessCard
                name={formData.fullName}
                email={formData.email}
                github={formData.github}
                avatarPreview={avatarPreview}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;