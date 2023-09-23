import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import Quiz from "../../pages/quiz";
import Application from "../../pages/_app";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Quiz">
                <Quiz/>
            </ComponentPreview>
            <ComponentPreview path="/Application">
                <Application/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;