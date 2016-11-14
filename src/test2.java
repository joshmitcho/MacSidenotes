/* Call upon functions while application is open */
public class DOMContentLoaded {

    /** Count of the number of time 'List' button has been clicked */
    public int numClicks;
    /** Updates number of times application has been opened and closed */
    public int updateNum;
    
   
    
    /** Makes user confirm whether or not they want to delete note
     * 
     */
    public void deleteNote() {
        
    } 
    /** Function deletes any empty notes 
    *
    */
    public void deleteEmpty(){
        
    }
    
    /** Counts the number of times list button has been clicked 
    *
    */
    public void clickCounter(){
        
    }
    
    /**Show/Hides List on button click
    *
    */
    public void showList(){
        
        
    }
    
    /** Funciton updates the master list containing all notes
    *
    */
    public void updateMasterList(){
        
        
    }
    
    /** This function brings up the note referenced to the current website 
    *
    */
    public void updateNote(){
        
        updateMasterList();
        
    }
    
    
    /**Note is saved in local storage
     *The id 'note' refers to the textarea where the user types their note
     */
    public void saveNote(){
        

        
    }
    
    
    /** Function grabs the URL of the current tab
     * Returns the URL
     */
    public String getURL() {
        
        return pageURL;
    }
    
    
    /** Function to display messages for testing purposes as well as notifying user of possible deletion
     * @param msg is the message that will be displayed on the screen
     * @param duration is the duration of thime the message will be displayed on the screen
     */
    public void customAlert(msg,duration)
    {
        
    }
    
    /** Function to display messages for testing purposes as well as notifying user of saved changes
     * @param msg is the message that will be displayed on the screen
     * @param duration is the duration of thime the message will be displayed on the screen
     */
    public void customAlertGood(msg,duration)
    {
        
    }

}
