import {
    useBlockProps,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';

import {
    Button,
    PanelBody,
    SelectControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { items = [], heading, scheme, bodyText } = attributes;

    const blockProps = useBlockProps({
        className: `numbered-list ${scheme}`
    });

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [field]: value
        };
        setAttributes({ items: newItems });
    };

    const addItem = () => {
        setAttributes({
            items: [
                ...items,
                { title: '', text: '' }
            ]
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Numbered List Scheme" initialOpen={true}>
                    <SelectControl
                        label="Colour Scheme"
                        value={scheme}
                        options={[
                            { label: 'White', value: 'white' },
                            { label: 'Dark', value: 'dark' },
                            { label: 'Blue', value: 'blue' }
                        ]}
                        onChange={(value) => setAttributes({ scheme: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>

                <RichText
                    tagName="h2"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder="Add section heading…"
                />

                <RichText
                    tagName="p"
                    value={bodyText}
                    onChange={(value) => setAttributes({ bodyText: value })}
                    placeholder="Add text…"
                />

                <ol>
                    {items.map((item, index) => (
                        <li key={index} className="list-item">
                            <p className="h4 list-item-number">{index + 1}</p>

                            <RichText
                                tagName="h3"
                                className="h4 list-item-title"
                                value={item.title}
                                onChange={(value) =>
                                    updateItem(index, 'title', value)
                                }
                                placeholder="List item title…"
                            />

                            <RichText
                                tagName="p"
                                className="list-item-content"
                                value={item.text}
                                onChange={(value) =>
                                    updateItem(index, 'text', value)
                                }
                                placeholder="List item text…"
                            />
                        </li>
                    ))}
                </ol>

                <Button
                    variant="primary"
                    onClick={addItem}
                >
                    Add Item
                </Button>
            </div>
        </>
    );
}