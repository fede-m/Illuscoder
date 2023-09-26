


class Character {
    constructor(name, gender, hairColor, eyesColor) {
        this.name = name;
        this.gender = gender;
        this.hairColor = hairColor;
        this.eyesColor = eyesColor;
    }
}



var StoryPrompt = {
    title: "",
    genre: "",
    num_characters: 0,
    time: "",
    chapter: "",
    currChapter: 0,
    characters: []
}

var username = ""
var num_chapters = 0
var question_num = 2
var curr_character = 1
var curr_chapter = 1

const genre_map = new Map()
genre_map.set("1","fantasy")
genre_map.set("2","adventure")
genre_map.set("3", "romantic")
genre_map.set("4","horror")

const timeMap = new Map()
timeMap.set("1","medieval")
timeMap.set("2", "future")
timeMap.set("3", "post-apocalyptic")
timeMap.set("4", "present")



function onEnter(event) {
    if (event.key == "Enter") {
        
        var change = saveAnswers(event.srcElement.name, event.srcElement.value)
        
        if(change){
            return;
        }
        else {
            if (question_num == 7 + StoryPrompt.num_characters){
                
                var textArea = document.getElementById("chapter-"+curr_chapter.toString())
                textArea.classList.add("active")
                document.getElementById("title-chapter-"+curr_chapter.toString()).classList.add("active")
                document.getElementById("button-section-"+curr_chapter.toString()).classList.add("active")
                document.getElementById("generate-button-"+curr_chapter.toString()).classList.add("active")

                textArea.focus()
            } 
            else{
                if (question_num > 6 && question_num < 7 + StoryPrompt.num_characters){
                    
                    var text = "<div id ='question-"+question_num+"' class = 'question'>Describe character " +curr_character +" (In this order: name, gender, hair color, eyes color)</div>"
                    text += "<input type='text' id='answer-"+question_num +"' name = 'character' autocomplete = 'off' class= 'answer description' autofocus onkeydown='onEnter(event)'></input>"
                    var charactersArea = document.getElementById("characters-area")
                    
                    charactersArea.innerHTML += text
                    curr_character += 1
                    
                }
            var next_question = document.getElementById("question-"+question_num.toString())
            var next_answer = document.getElementById("answer-"+question_num.toString())
            
            next_question.classList.add("active")
            next_answer.classList.add("active")
            question_num += 1
            next_answer.focus()
            }
        }
    }
    

}

function saveAnswers(name,value){
    
    switch (name) {
        case "username":
            if (username != ''){
                username= value
                return "Change"
            } 
            username= value;

            break;
        case "title":
            if(StoryPrompt.title != ''){
                StoryPrompt.title = value;
                return "Change"
            } 
            StoryPrompt.title = value;

            break;
        case "genre":
            // Make a check that the User enters that you asked
            if(genre_map.get(value) == undefined){
                return "Error"
            }
            if(StoryPrompt.genre != ''){
                StoryPrompt.genre = genre_map.get(value);
                return "Change"
            } 
           
            StoryPrompt.genre = genre_map.get(value);
            
            break;
        case "num_char":
            if(StoryPrompt.num_characters != 0){
                StoryPrompt.num_characters = Number(value);
                return "Change"
            } 
            
            StoryPrompt.num_characters = Number(value);

            break;
        case "time":
            if(timeMap.get(value) == undefined){
                return "Error"
            }
            if(StoryPrompt.time != '') {
                StoryPrompt.time = timeMap.get(value);;
                return "Change"
            } 
            
            StoryPrompt.time = timeMap.get(value);;

            break;
        case "num_chap":
            
            if(num_chapters != 0){
                num_chapters = Number(value)
                return "Change"
            }

            num_chapters = Number(value)
            break;
        case "character":
            // Save value into the element
            var num = question_num-1
            var charDescription = document.getElementById("answer-"+ num)
            //charDescription.value = value
            charDescription.setAttribute('value', value)
            characteristics = value.split(",")

            var hair = characteristics[2] + " hair"
            var eyes = characteristics[3] += " eyes"
            var character = new Character(characteristics[0].trim(),characteristics[1].trim(),hair.trim(), eyes.trim())

            StoryPrompt.characters.push(character)
            break;
        default:
            break;
        
    }

}

async function generateImage() {
  
    var chap = document.getElementById("chapter-"+curr_chapter.toString()).value

    StoryPrompt.chapter = chap
    StoryPrompt.currChapter = curr_chapter.toString()
    var message = JSON.stringify(StoryPrompt)
    console.log(message)
    var url = getCurrentURL()
  url += "generate_image"
 


    
  var config = {
   headers: {
   'Access-Control-Allow-Origin' : '*'
   }
  }

  
    // connection to Flask application --> request with fetch
    // var response = await fetch(url, {
    //  method: "POST",
    //  body: message,
    //  headers: {"Content-Type":"application/json; charset=UTF-8"}
    //  }     
    // )
    const response = await axios.post(url, message, config)
    
      .then(function (response) {
        console.log(response)
        if (response.ok) {
          
        } else {
        console.error("Error fetching image:", response.status)
      }
    
      })
      
    
    //console.log(response)
    
    
    //var unpackedResponse = JSON.parse(response)
    // GIF auspacken von json
    // GIF auf der Webseite zeigen
    // Beim loading etwas sagen/zeigen

    //var gif = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGIF&psig=AOvVaw13U9i2JiTsp5MBOVZvW1yk&ust=1674908946286000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJDA25jg5_wCFQAAAAAdAAAAABAE"

  var currImg = document.getElementById("image-result-" + curr_chapter.toString())

  currImg.classList.add("active")
  currImg.focus()
  
  

    

    if (curr_chapter<num_chapters){
        var nextButton = document.getElementById("next-chapter-"+curr_chapter.toString())
        nextButton.classList.add("active")
    }
     
}


function getCurrentURL() {
  return window.location.href
}

function dealWithResponse(e) {
  (this.response.text().then(imageStr => {
    var base64Flag = 'data:image/gif;base64,';
    var image = document.getElementById("image-result-"+curr_chapter)
    image.src = base64Flag + imageStr;
    
  }));
}

function generateNextChapter(){

    if (curr_chapter < num_chapters){
        console.log("I get here")

        curr_chapter += 1
        var newChapter = '<h1 id = "title-chapter-'+curr_chapter.toString() +'" class = "title-chapter">Chapter '+curr_chapter.toString()+'</h1><textarea id="chapter-'+curr_chapter.toString()+'" placeholder="Start writing your story here..." class = "chapter"></textarea><div id = "button-section-'+curr_chapter.toString()+'"><button id = "generate-button-'+curr_chapter.toString()+'" class = "generate_button" type = "button" onclick="generateImage()"> GENERATE </button></div><img id = "image-result-'+curr_chapter.toString()+'" class = "image-results" src="" alt="Chapter '+curr_chapter.toString()+'"></img><button id="next-chapter-'+curr_chapter.toString()+'" class = "generate_button" type = "button" onclick="generateNextChapter()">NEXT CHAPTER</button>'
        var chapterArea = document.getElementById("chapter-area")
        chapterArea.innerHTML += newChapter
        console.log(chapterArea.innerHTML)
        var textArea = document.getElementById("chapter-"+curr_chapter.toString())
        textArea.classList.add("active")
        document.getElementById("title-chapter-"+curr_chapter.toString()).classList.add("active")
        document.getElementById("button-section-"+curr_chapter.toString()).classList.add("active")
        document.getElementById("generate-button-"+curr_chapter.toString()).classList.add("active")

        textArea.focus()

        
    }
}