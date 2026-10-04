import { useState, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "../../pages/PublicNavbar";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const ReportCase = () => {
  const user = useSelector((store)=>store.auth.user)
  const [description, setDescription] = useState("");
  const [caseType, setCaseType] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [cityTownVillage, setCityTownVillage] = useState("");
  const [mandal, setMandal] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(false);

  

  const openCamera = async () => {
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      alert("Camera access denied. Enable it in browser settings.");
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageUrl);
    setIsImageCaptured(true);
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    {console.log("User : ",user)}
    if (!description || !caseType || !capturedImage || !state || !district || !cityTownVillage || !mandal || !locality || !pincode) {
      alert("Please fill all required fields, select a case type, and capture an image using the camera.");
      return;
    }
  
    setLoading(true);
  
    // Convert base64 image to a binary blob
    const imageBlob = await fetch(capturedImage).then((res) => res.blob());
  
    const formData = new FormData();
    formData.append("description", description);
    formData.append("caseType", caseType);
    formData.append("cameraImage", imageBlob); // Append binary blob
    formData.append("state", state);
    formData.append("district", district);
    formData.append("cityTownVillage", cityTownVillage);
    formData.append("mandal", mandal);
    formData.append("locality", locality);
    formData.append("pincode", pincode);
    formData.append("landmark", landmark);
    formData.append("userId", String(user?.userId)); 


  
    try {
      await axios.post("/api/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Case reported successfully!");
      setLoading(false);
      resetForm(); // Reset form after successful submission
    } catch (error) {
      alert("Error reporting case: " + error.message);
      setLoading(false);
    }
  };
  
  // Optional: Add resetForm function to clear the inputs
  const resetForm = () => {
    setDescription("");
    setCaseType("");
    setState("");
    setDistrict("");
    setCityTownVillage("");
    setMandal("");
    setLocality("");
    setPincode("");
    setLandmark("");
    setCapturedImage(null);
    setIsImageCaptured(false);
  };
  

  return (
    <>
    <PublicNavbar />
    <div
  style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    marginTop: "75px", // 👈 Add this line if not using padding
  }}
>


      <div className="card shadow-lg p-4" style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.8)", 
          borderRadius: "10px", 
          maxWidth: "800px",
          width: "100%",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
        }}
      >
        <h2 className="text-center mb-4 text-primary">📢 Report a Case</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea className="form-control" placeholder="Describe the issue..." onChange={(e) => setDescription(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Case Type:</label>
                <select className="form-control" value={caseType} onChange={(e) => setCaseType(e.target.value)} required>
                  <option value="">Select Case Type</option>
                  <option value="Homeless">Homeless</option>
                  <option value="Child Labor">Child Labor</option>
                  <option value="Abandoned Person">Abandoned Person</option>
                  <option value="Elderly in Need">Elderly in Need</option>
                  <option value="Medical Emergency">Medical Emergency</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <h5 className="text-secondary fw-bold">📍 Location Details</h5>
              <input type="text" className="form-control mb-2" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
              <input type="text" className="form-control mb-2" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} required />
              <input type="text" className="form-control mb-2" placeholder="City/Town/Village" value={cityTownVillage} onChange={(e) => setCityTownVillage(e.target.value)} required />
              <input type="text" className="form-control mb-2" placeholder="Mandal / Taluka" value={mandal} onChange={(e) => setMandal(e.target.value)} required />
              <input type="text" className="form-control mb-2" placeholder="Locality / Street Name" value={locality} onChange={(e) => setLocality(e.target.value)} required />
              <input type="text" className="form-control mb-2" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
              <input type="text" className="form-control mb-3" placeholder="Landmark (Optional)" value={landmark} onChange={(e) => setLandmark(e.target.value)} />

              <h5 className="text-secondary fw-bold">📷 Capture Image</h5>
              {!isImageCaptured && (
                <>
                  <button type="button" className="btn btn-primary mb-3" onClick={openCamera}>Open Camera</button>
                  {isCameraOpen && (
                    <>
                      <video ref={videoRef} autoPlay className="w-100"></video>
                      <button type="button" className="btn btn-warning mt-2" onClick={captureImage}>Capture</button>
                    </>
                  )}
                </>
              )}
              {isImageCaptured && <img src={capturedImage} alt="Captured" className="img-fluid mt-2" />}
              
              <div className="text-center">
                <button type="submit" className="btn btn-success">{loading ? "Submitting..." : "Submit Report"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
    <Footer />
    </>
  );
};

export default ReportCase;
