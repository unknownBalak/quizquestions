import React, {  FormEvent, useEffect, useState} from 'react'
import "./Home.css";
import Swal from "sweetalert2";
interface down{
    id: number,
    title:String,
    created_at: String,
    updated_at: String,
    clues_count:number,
} 

interface Provider {
    id: number,
    answer: String,
    question: String,
    value: number,
    airdate: String,
    created_at: String,
    updated_at: String,
    category_id: number,
    game_id: null,
    invalid_count: null,
    catogery: down,
}

const Home: React.FC = () => {
 const [loadQuestion, setLoadQuestion] = useState<boolean | number>(false);
 const [askedQuestion, setAskedQuestion] = useState<Provider>();
 const [ansRes, setAnswerRes] = useState<boolean | number | String>();
    useEffect(()=>{
     async function fetchQuestion(url:RequestInfo) {
           const result = await fetch(url);
           const data = await result.json(); 
           setAskedQuestion(data[0]);
        }  
        fetchQuestion("https://jservice.io/api/random");
    },[loadQuestion]);
    
   async function validateAnswer(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            answerInput: HTMLInputElement,
        }
        const inputVal = target.answerInput.value;
        if(inputVal===""){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: true
              })
              
          let res = await swalWithBootstrapButtons.fire({
                title: 'You have not entered any value! Are you sure want to submit?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, do it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              })
          if(!res.isConfirmed) return;
        }
        if(inputVal===askedQuestion?.answer){
            setAnswerRes(true);
        }else{
            setAnswerRes(false);
        }
        setLoadQuestion(!loadQuestion);
        target.answerInput.value = "";
        target.answerInput.focus();
    }

    // console.log("This is erer ", askedQuestion, ansRes);
    return (
    <div className="asked__questions">
        <h1>Quiz-time</h1>
        <div className="question"><h3>Q.) {askedQuestion?.question}</h3> </div>
        <div className="answer">
            <form action="" onSubmit={validateAnswer}>
                <input type="text" id="answerInput"  />
                <button type='submit' className='submitButton' >Submit</button>
            </form>
        </div>
        
     {(ansRes!==undefined) ?  (ansRes) ? <div className="ansRight">Correct Answer</div>: <div className="ansWrong" >Wrong Answer </div>: ""}
    </div>
  )
}

export default Home