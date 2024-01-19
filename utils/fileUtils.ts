export const setWIthPreview = (event: any, attachment: any, setAttachment: any, setPreviewAttachment: any) => {
  const file = event.target.files[0];
  setAttachment(file);

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => setPreviewAttachment(reader.result);
    reader.readAsDataURL(file);
  } else if (!attachment) {
    setPreviewAttachment(null);
  }
};