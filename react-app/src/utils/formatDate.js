    //! function to format date will move to another file.
    const formatDate = (date, time) =>{
        //! can use the string to create a new date obj, then I can use the date methods to format.
        // const testDate = new Date(message.updated_at)
        // console.log(testDate);
        let dateArr = date.split(' ');
        let [weekday, day, month, year, clock] = dateArr

        let dateString = time ? [day, month, year, clock].join(' ') : [day,month,year].join(' ');

        let formattedDate = new Date (dateString)

        if(!time){
            formattedDate = formattedDate.toLocaleDateString('en-us', {year:'numeric', month: 'short', day: 'numeric'})
        }
        else{
            formattedDate = formattedDate.toLocaleString('en-us',{timeZone : 'UTC'})
        }
        return formattedDate

        //! parse out day of month, month, and year
        //! indexes 1,2,3 then join with space

        //!let testDate = new Date('19 Jan 2023').toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})

    }


export default formatDate;
