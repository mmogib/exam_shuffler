module.exports = class MainView {
	html() {
		return `
            <h2>Exam Shuffler</h2>
        <hr/>
        <ol>
        <div class="row">
            <li>First fill in the following form and click save to start preparing your exam.</li>
        </div>
        <div class="row">

            <div class="four columns">
            <label for="varTerm">Semester</label>
            <input autofocus class="u-full-width" type="number" placeholder="for example: 171" id="varTerm">
            </div>
            <div class="four columns">
            <label for="varCourseCode">Course</label>
            <input class="u-full-width" type="text" placeholder="for example: MATH101" id="varCourseCode">
            </div>
            <div class="four columns">
            <label for="varExamTitle">Exam Name</label>
            <input class="u-full-width" type="text" placeholder="for example: EXAM I" id="varExamTitle">
            </div>
            
        </div>
        <div class="row">
            <div class="six columns">
            <label for="varDate">Date </label>
            <input  class="u-full-width" type="text" placeholder="for example: Monday 21/12/2017" id="varDate">
            </div>
            <div class="six columns">
            <label for="varTimeAllowed">Time Allowed</label>
            <input class="u-full-width" type="text" placeholder="for example: 120 minutes" id="varTimeAllowed">
            </div>
            
        </div>
        <div class="row">
            <div class="four columns">
            <label for="varNumOfQuestions">Number of Questions</label>
            <input class="u-full-width" type="number" placeholder="for example: 20" id="varNumOfQuestions">
            </div>
            <div class="four columns">
            <label for="varNumOfVersions">Number of Versions</label>
            <input class="u-full-width" type="number" placeholder="for example: 4" id="varNumOfVersions">
            </div>
            <div class="four columns">
            <label for="varNumAnswers">Number of Answers</label>
            <input class="u-full-width" type="number" placeholder="for example: 5" id="varNumAnswers">
            </div>
        </div>
        <div class="row" >
            <div class="twelve columns">
                <div><strong>Number of Group</strong> 
                    <span id="varNumGroups"></span>
                    <span id="groups"></span>
                    <a href="#" id="changeGroupgs" >change</a>
                </div>
            </div>
            
        </div>
        <div class="row" > 
            <div class="twelve columns">
            <input class="button-default u-full-width" type="button" id="saveConfig" value="Save">
            <div>
         </div>
        
        <div class="row">
        <p id="exam-processed"></p>
        </div>
        <div class="row">
            <li> Second download this
            <a id="download-template" href="#" class="button-primary">
                Template
            </a> and use it to write your exam. Please make sure not to alter its structure.
            <p id="downloaded-template"></p>
            </li>

        </div>
        <div class="row">
            <li> Click
            <a id="upload-exam" href="#" class="button-primary">here </a>
            to upload your exam.
            <p id="exam-uploaded"></p>
            </li>
        </div>
        <div class="row" >
            
            <input class="button-primary u-full-width" type="button" id="downloadFile" value="Download Exam">
        </div>
        </ol>
    </div>
    
        `
	}
	groupHtml(groups) {
		if (!groups || groups.length === 0) {
			return 'Your questions are all in one group'
		}
		return `(${groups.join(', ')})`
	}
}
