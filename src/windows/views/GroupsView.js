export default class GroupView {
	html() {
		return ` 
        <div class="container">
        <h2>Groups</h2>
        <p></p>
        <div class="alert hide" id="error-message">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        </div>
        <div class="row" id="groups">

        </div>
        <div class="row">
            <div class="twelve columns">
                <button href="#" class="button button-default u-full-width" id="addNewGroup">New Group</button>
            </div>
            <div class="twelve columns">
                <button id="cancelWindow" class="button button-default u-full-width">Cancel</button>
            </div>
            <div class="twelve columns">
                <button id="saveWindow" class="button button-primary u-full-width">Save & Close</button>
            </div>
        </div>
    </div>
    
        `
	}
	groupField(group, index) {
		return `
            <div class="twelve columns">
                <label for="group_${index}">Group ${index + 1}</label>
                <input class="group" type="text" value="${group}" >
                 <a href="#" >
                 <i id="deletegroup_${index}" class="fa fa-close icon"></i>
                 </a>
            </div>
        `
	}
}
