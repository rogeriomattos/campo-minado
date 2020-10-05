class Squad {
    constructor(value = undefined, isActive = false, isFlag = false ) {
        this.value = value;
        this.isActive = isActive;
        this.isFlag = isFlag; 
    }

    setValue(value) {
        this.value = value;
    }

    setIsActive(isActive) {
        this.isActive = isActive;
    }

    setIsFlag(isFlag) {
        this.isFlag = isFlag;
    }

    isBomb() {
        return this.value == 'B';
    }
}

export default Squad;