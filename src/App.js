// @flow
import * as React from "react";
import {Provider} from "mobx-react";
import {rootStores} from "./mobx/RootStore";
import AppContent from "./AppContent.jsx";

const App = () => (
    <Provider {...rootStores}>
        <AppContent />
    </Provider>
);

export default App;
