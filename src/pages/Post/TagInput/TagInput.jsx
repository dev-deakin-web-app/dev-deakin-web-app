import React, {SyntheticEvent, useState} from 'react';
import {ChakraTagsInput} from "chakra-tags-input";

export var tagsExport;

const TagInput = () => {
    const [tags, setTags] = useState([]);

    tagsExport = tags;

    const handleTagsChange = (
        event: SyntheticEvent,
        tags: string[]
    ) => {
        setTags(tags)
    };

    return (
        <ChakraTagsInput
            tags={tags}
            onTagsChange={handleTagsChange}
            ontFamily={"mono"} marginTop={5} rounded={"3xl"}
            width={"full"}
            placeholder={"Write here"}
        />
    )
}

export default TagInput