import {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUploadCheck,
    MediaUpload,
} from '@wordpress/block-editor';

import {
    Button,
    PanelBody,
    SelectControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { items = [], heading, scheme, bodyText } = attributes;

    const blockProps = useBlockProps({
        className: `testimonials ${scheme}`
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
                { title: '', text: '', icon: '' }
            ]
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Testimonials Scheme" initialOpen={true}>
                    <SelectControl
                        label="Colour Scheme"
                        value={scheme}
                        options={[
                            { label: 'Eggshell', value: 'eggshell' },
                            { label: 'Evergreen', value: 'evergreen' },
                            { label: 'Celadon', value: 'celadon' }
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

                    {items.map((item, index) => (
                        <div key={index} className="testimonial-item">

                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => updateItem(index, 'icon', media.url)}
                                    allowedTypes={['image']}
                                    render={({ open }) => (
                                        <Button onClick={open} variant="primary">
                                            {item.icon ? 'Change Image' : 'Select Image'}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
            
                            {item.icon && <img src={item.icon} alt="" />}

                            <RichText
                                tagName="h3"
                                className="h4 testimonial-item-title"
                                value={item.title}
                                onChange={(value) =>
                                    updateItem(index, 'title', value)
                                }
                                placeholder="Testimonial item title…"
                            />

                            <RichText
                                tagName="p"
                                className="testimonial-item-content"
                                value={item.text}
                                onChange={(value) =>
                                    updateItem(index, 'text', value)
                                }
                                placeholder="Testimonial item text…"
                            />
                        </div>
                    ))}

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