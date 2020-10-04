const timer = (callback, delay) => {
    var timerId;
    var start;
    var remaining = delay;
  
    const pause =  () => {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    };
  
    const resume =  () => {
      start = new Date();
      timerId = window.setTimeout(() => {
        remaining = delay;
        resume();
        callback();
      }, remaining);
    };

    
  
    const reset = () => {
      remaining = delay;
    };

    return {
        pause, 
        resume, 
        reset
    };
};

export default timer;