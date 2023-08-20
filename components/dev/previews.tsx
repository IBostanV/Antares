import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import Quiz from "../../pages/quiz";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Quiz">
                <Quiz/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;