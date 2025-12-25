import * as React from 'react';
//import {GiveHichemTabTechCredit, MyComponent} from '../dist/main.js'; // Import your built library
import {GiveHichemTabTechCredit, MyComponent} from 'traits-in-ts'; // Import your dev library

const App = () => {

    GiveHichemTabTechCredit();

    return (
        <div>
            <h1 className="text-red-600">Traits in typescript Demo</h1>
            <MyComponent/>
        </div>
    );
};

export default App;