
// user chose component
prompt.start();

prompt.get([{
    name: 'name',
    required: true
}], function (err, result) {
    //
    // Log the results.
    //
    var projectName = result.name
    console.log(`Would you like to use 'scss or css'?`);
    prompt.get([{
        name: 'styling',
        required: true
    }], function (err, result) {
        //
        // Log the results.
        //
        var stylingVar = '';
        if (result.styling === 'css'){
            stylingVar = '--style:css'
        }else{
            stylingVar = '--style:scss'
        }
        console.log(`Generating component: ${projectName}`);

        value = '-c';
        argument3 = projectName;
        argument4 = stylingVar;

        //
        //re-execute genScript with new values
        genScript();
        //
        //

    });

});