import {CreateButton, ExportButton, FilterButton, TopToolbar} from "react-admin";
import * as React from "react";

export const ListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);