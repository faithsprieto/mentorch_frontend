import { useState, useEffect } from "react";
import MentorchNav from "../components/mentorch/mentorchNav"; 
import { useNavigate } from "react-router-dom";

import "../styles/pagestyles/mentorchipPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function EvaluationPage() {

  return (

    <div className="evaluations">
    
      <div className="header">
        <h2>Evaluation</h2>
        <MentorchNav onNavigate={(section) => console.log(section)} />
      </div>

    </div>

  );
}