    //! function to format date will move to another file.
    const formatDate = (date) =>{
        //! can use the string to create a new date obj, then I can use the date methods to format.
        // const testDate = new Date(message.updated_at)
        // console.log(testDate);
        const formattedDate = new Date (date)
        // Specify default date formatting for language (locale)
        // console.log(new Intl.DateTimeFormat('en-US').format(date));
        // console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney' }).format(date));
        // Expected output: "12/20/2020"

        // let options = {
        //     year: 'numeric', month: 'numeric', day: 'numeric',
        //     hour: 'numeric', minute: 'numeric', second: 'numeric',
        //     hour12: false,
        //     timeZone: 'America/Los_Angeles'
        //   };
        //   console.log(new Intl.DateTimeFormat('en-US', options).format(date));
        //    "12/19/2012, 19:00:00"


    }


export default formatDate;
