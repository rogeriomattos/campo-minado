const handleClick = () => {

    const onFlag = (squad) => {
        if(squad.isActive || squad.isFlag)
            squad.setIsFlag(false);
        else
            squad.setIsFlag(true);
        return squad;
    };

    return {
        onFlag
    };
};

export default handleClick;