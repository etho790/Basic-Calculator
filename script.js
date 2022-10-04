let display = document.getElementById("display");
let Answerdisplay = document.getElementById("Answerdisplay");
//gets all "data" tag buttons and stores them in these vars
//moreover coverts them into an array and stores them into the const buttons var
const buttons  = Array.from(document.querySelectorAll('[data]'));


let arr = []; //this array is going to be modified indirectly never DIRECTLY.
buttons.map(button=>    //iterates through all elements in the array, which are essentially all of the button values
  {
      button.addEventListener('click', (e) =>   //response to when clicking on the button element
      {
        switch(e.target.innerText)  //if the e.target.inntertext value is any of the cases
        {
          case 'AC':
            display.innerText = '';
            ClearArray()
            break;
          
          case '+':
            MaxChars(e)  
            RemoveEmptySpaces ('+')     
            
            break;
  
          case '−':
            MaxChars(e)
            RemoveEmptySpaces ('−')   
            
            break;

          case '×':
              
            MaxChars(e)  
            RemoveEmptySpaces ('×')

            break;
            
          case '÷':
              
            MaxChars(e)
            RemoveEmptySpaces ('÷') 

            break;
          
          case '.':         
            MaxChars(e)  
            decimalpoint();

            break;
          
          case '=':            

            ExecutionFunc();
            break;

          case 'DEL':
              
            display.innerText = display.innerText.substring(0, display.innerText.length - 1)
            arr.pop();
            Answerdisplay.innerText = '';
            break;


          default:    //NUMBERS
            MaxChars(e)
            let r = display.innerText.split(/([+,−,×,÷])/); //only split the string if any operations have been entered
            
          
        }
      })  
  })



  function RemoveEmptySpaces (currentOp)
  {
    //display.innerText = display.innerText + currentOp //adds current value to current string for display

    //only split the string if any operations have been entered
     let r = display.innerText.split(/([+,−,×,÷])/);
    
     for (var i = 0; i<r.length; i++) 
     {
       //goes through the entire split string and removes the empty element
       if (r[i] === '') r.splice(i, 1);
     }     
     //so the empty character exists immediately after an operation and is used only if there is another number.
     //if its another operation right after, then the empty char element exists     
    

     //checking the value of the operator of the second to last element TO mainly check if the previous element was an operator
     //SO ONLY IF THE PREVIOUS ELEMENT WAS AN OPERATOR <-- this check is just to make sure we dont have multiple operators together 
     //as opposed to being separated by a number in between
    if(r[r.length - 2]=='−'|| r[r.length - 2]=='×'||r[r.length - 2]=='÷'||r[r.length - 2]=='+') 
     {                    
       r[r.length - 2]=currentOp
       r.pop()//removes the last/current element in the array
       console.log("MODIFIED ARRAY WITH OPERATOR: ", r)      
       arr.pop();   //so if the previous element was an operator, pop it out
       arr[arr.length-1]=currentOp  // and change the current element/ie the previous element = the current operator
    
       display.innerText = display.innerText.substring(0, display.innerText.length - 2) //removes the previous element from screen
       display.innerText = display.innerText + currentOp     //adds the current element in place 
     }



     if(r[0]=='−'||r[0]=='×'||r[0]=='÷'||r[0]=='+' )
        {
          arr.splice(0, arr.length)
          console.log("YO")

          display.innerText = '';

          Answerdisplay.innerText = "MUST INPUT A NUMBER FIRST"

        }
  }

    



  function decimalpoint() 
  {   
    //splitArray has the display text split according to operations 
    let SplitArray = display.innerText.split(/([+,−,×,÷])/);

    //splits the last element which is a number in the already split array based on decimal points, 
    //so you only see the current element number being split based on a '.' and puts it in an ARRAY
    //essentially now the new array consists of the numbers before a decimal point, decimal point & numbers after a decimal point
    let CurrentNumberedElementArray = SplitArray[SplitArray.length-1].split(/([.])/)
   
    for (var i = 0; i<CurrentNumberedElementArray.length; i++) 
    {
      //goes through the entire split string and removes the empty element
    if (CurrentNumberedElementArray[i] === '') CurrentNumberedElementArray.splice(i, 1);
    }

     //MAKING SURE THERE WILL BE ONLY ONE DECIMAL POINT PER NUMBER IN THE ARRAY BY CHECKING THE NUMBER OF DECIMALS PRESSENT IN CURRENT ARRAY
     let numberofDecimals = CurrentNumberedElementArray.filter(x => x === '.').length 
     console.log('number of decimals are :',numberofDecimals)

    if(numberofDecimals>1)
    {//since this function is triggered when a decimal point is pressed
      CurrentNumberedElementArray.pop() //pop the decimal point element if a decimal point already exists
      arr.pop();  //pop it in the official array too
      display.innerText = display.innerText.substring(0, display.innerText.length - 1)
      console.log(CurrentNumberedElementArray)
     
    }else(console.log('new array is :',CurrentNumberedElementArray))


  }

  function ClearArray()
  {
    arr.splice(0, arr.length)
    console.log("array is ", arr)

    Answerdisplay.innerText = '';
  }

  function ExecutionFunc()
  {   
    var MaxAmntOfChars = 20
    if(arr.length>=MaxAmntOfChars)
    { //if you've reached max capacity of inputs but the last element is an operation or decimal point
      if(arr[arr.length-1]=='−'|| arr[arr.length-1]=='×'||arr[arr.length-1]=='÷'||arr[arr.length-1]=='+' || arr[arr.length-1]=='.')
      {
        //MAKE THIS FONT LOOK ROBOTIC IN THE STYLE.CSS & once we reach 20chars, if the last element is a number 
        //and we type in an operation (knowing that this exceeds the 20 chars), it removes the number & modifies the 
        //operation prior, fix this for professionalism
        Answerdisplay.innerText = "INVALID INPUTS"
      }
      else //if it's a number at the end, we can execute the function
      {
            //splitArray has the display text split according to operations 
            let SplitArray = display.innerText.split(/([+,−,×,÷])/);

            //BEDMAS
            for (var i = 0; i < SplitArray.length; i++)
            {
              for (var j = 0; j < SplitArray.length; j++)
              {
                if(SplitArray[j]=='÷')
                {
                  var DivisionResult = parseFloat(SplitArray[j-1])/parseFloat(SplitArray[j+1])
                  SplitArray[j]=DivisionResult.toString()
                  SplitArray.splice(j-1,1);
                  SplitArray.splice(j,1);
                }

                if(SplitArray[j]=='×')
                {
                  var MultiplicationResult = parseFloat(SplitArray[j-1])*parseFloat(SplitArray[j+1])
                  SplitArray[j]=MultiplicationResult.toString()
                  SplitArray.splice(j-1,1);
                  SplitArray.splice(j,1);
                }
              }             
            }
         
            //BEDMAS
            for (var i = 0; i < SplitArray.length; i++)
            {
              for (var j = 0; j < SplitArray.length; j++)
              {
                if(SplitArray[j]=='+')
                {
                  var AdditionResult = parseFloat(SplitArray[j-1])+parseFloat(SplitArray[j+1])
                  SplitArray[j]=AdditionResult.toString()
                  SplitArray.splice(j-1,1);
                  SplitArray.splice(j,1);
                }

                if(SplitArray[j]=='−')
                {
                  var SubtractionResult = parseFloat(SplitArray[j-1])-parseFloat(SplitArray[j+1])
                  SplitArray[j]=SubtractionResult.toString()
                  SplitArray.splice(j-1,1);
                  SplitArray.splice(j,1);
                }
              }             
            }           
           
            Answerdisplay.innerText = SplitArray;

      }
    }
    else if(arr.length<MaxAmntOfChars)
    {

      if(arr[arr.length-1]=='−'|| arr[arr.length-1]=='×'||arr[arr.length-1]=='÷'||arr[arr.length-1]=='+' || arr[arr.length-1]=='.')
      {
        //MAKE THIS FONT LOOK ROBOTIC IN THE STYLE.CSS 
        Answerdisplay.innerText = "INVALID INPUTS"
      }
      else    //if it's a number at the end, we can execute the function
      {
            //splitArray has the display text split according to operations 
            let SplitArray = display.innerText.split(/([+,−,×,÷])/);


            //BEDMAS
            for (var i = 0; i < SplitArray.length; i++)
            {
              for (var j = 0; j < SplitArray.length; j++)
              {
                if(SplitArray[j]=='÷')
                {
                  var DivisionResult = parseFloat(SplitArray[j-1])/parseFloat(SplitArray[j+1])
                  SplitArray[j]=DivisionResult.toString()
                  SplitArray.splice(j-1,1);
                  SplitArray.splice(j,1);
                }
                if(SplitArray[j]=='×')
                {
                  var MultiplicationResult = parseFloat(SplitArray[j-1])*parseFloat(SplitArray[j+1])
                  SplitArray[j]=MultiplicationResult.toString()
                  SplitArray.splice(j-1,1);
                  SplitArray.splice(j,1);
                }


              }
            }
          
            //BEDMAS
            for (var i = 0; i < SplitArray.length; i++)
            {
              for (var j = 0; j < SplitArray.length; j++)
              {
                if(SplitArray[j]=='+')
                {
                  var AdditionResult = parseFloat(SplitArray[j-1])+parseFloat(SplitArray[j+1])
                  SplitArray[j]=AdditionResult.toString()
                  SplitArray.splice(j-1,1);
                  SplitArray.splice(j,1);
                }
                if(SplitArray[j]=='−')
                {
                  var SubtractionResult = parseFloat(SplitArray[j-1])-parseFloat(SplitArray[j+1])
                  SplitArray[j]=SubtractionResult.toString()
                  SplitArray.splice(j-1,1);
                  SplitArray.splice(j,1);
                }

              }             
            }

            Answerdisplay.innerText = SplitArray;
      }
       
    }
    

  } 

  function MaxChars(e)
  {    
    var MaxAmntOfChars = 20
    if(arr.length<MaxAmntOfChars)
    {      

      arr.push(e.target.innerText);  
      display.innerText += e.target.innerText;      
      Answerdisplay.innerText = '';
    }    
    else if (arr.length>MaxAmntOfChars)
    {     
      arr.pop();  
      display.innerText = display.innerText.substring(0, display.innerText.length - 1)      
    }

  } 

