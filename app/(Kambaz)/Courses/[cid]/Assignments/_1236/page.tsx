export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label><br />
        <input id="wd-name" defaultValue="A3 - JAVASCRIPT + REACT" /><br /><br />
      <br/><br/>
        <textarea 
        id="wd-description"
        rows={10}
        cols={50}
        style={{width: '40%'}}
        defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
      />
      <br /><br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input 
              id="wd-points" 
              type="number" 
              defaultValue="100" 
            />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Complete/Incomplete">Complete/Incomplete</option>
              <option value="Letter Grade">Letter Grade</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type" defaultValue="Online">
              <option value="Online">Online</option>
              <option value="On Paper">On Paper</option>
              <option value="No Submission">No Submission</option>
            </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <label><b>Online Entry Options</b></label><br />
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry"> Text Entry</label><br />
            
            <input type="checkbox" id="wd-website-url" defaultChecked={true} />
            <label htmlFor="wd-website-url"> Website URL</label><br />
            
            <input type="checkbox" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings"> Media Recordings</label><br />
            
            <input type="checkbox" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation"> Student Annotation</label><br />
            
            <input type="checkbox" id="wd-file-upload" />
            <label htmlFor="wd-file-upload"> File Uploads</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label><br />
            <input 
              id="wd-assign-to" 
              type="text"
              defaultValue="Everyone" 
              style={{width: '100%'}} 
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <label htmlFor="wd-due-date">Due</label><br />
            <input 
              id="wd-due-date" 
              type="date" 
              defaultValue="2024-05-13" 
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <table>
              <tr>
                <td>
                  <label htmlFor="wd-available-from">Available from</label><br />
                  <input 
                    id="wd-available-from" 
                    type="date" 
                    defaultValue="2024-05-06" 
                  />
                </td>
                <td style={{paddingLeft: '10px'}}>
                  <label htmlFor="wd-available-until">Until</label><br />
                  <input 
                    id="wd-available-until" 
                    type="date" 
                    defaultValue="2024-05-20" 
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <hr />
      <div style={{textAlign: 'right'}}>
        <button style={{marginRight: '5px'}}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}