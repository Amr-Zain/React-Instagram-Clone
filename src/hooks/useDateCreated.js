import React from "react";

const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
};
function useDateCreated(dateCreated) {
    const [createdText, setCreatedText] = React.useState("Just now");
    
    React.useEffect(() => {
        if (!dateCreated) return;

    const calculateTimeDifference = () => {
        const now = new Date();
        const createdAt = new Date(dateCreated);
        let period = Math.floor((now - createdAt) / 1000); 

        if (period < 10) {
            return "Just now";
        }
        if (period < 60) {
            return `${period} seconds ago`;
        }

        let counter;
        for (const [unit, seconds] of Object.entries(intervals)) {
            counter = Math.floor(period / seconds);
            console.log(counter,unit)
            if (counter > 0) {
                if (counter === 1) {
                    return `${counter} ${unit} ago`;
                }
                return `${counter} ${unit}s ago`;
            }
            period %= seconds;
        }
    };

    setCreatedText(calculateTimeDifference());
        
    const interval = setInterval(() => {
        setCreatedText(calculateTimeDifference());
    }, 60000);

    return () => clearInterval(interval);
    }, [dateCreated]);

    return createdText;
}

export default useDateCreated;