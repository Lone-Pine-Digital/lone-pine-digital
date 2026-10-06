import {
    useBlockProps,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    Button
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { testimonials, scheme } = attributes;

    const blockProps = useBlockProps({
        className: `testimonial-block ${scheme}`,
    });


    const updateTestimonial = (index, field, value) => {
        const updated = [...testimonials];
        updated[index][field] = value;
        setAttributes({ testimonials: updated });
    };

    const addTestimonial = () => {
        setAttributes({
            testimonials: [
                ...testimonials,
                { quote: ''}
            ]
        });
    };

    return (
        <>
            <InspectorControls>
                {/* SCHEME PANEL */}
                <PanelBody title="Colour Scheme" initialOpen={true}>
                    <SelectControl
                        label="Scheme"
                        value={scheme}
                        options={[
                            { label: 'Eggshell', value: 'eggshell' },
                            { label: 'Evergreen', value: 'evergreen' },
                            { label: 'Celadon', value: 'celadon' }
                        ]}
                        onChange={(value) => setAttributes({ scheme: value })}
                    />
                </PanelBody>

                {/* TESTIMONIALS PANEL */}
                <PanelBody title="Testimonials" initialOpen={true}>
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '20px',
                                paddingBottom: '20px',
                                borderBottom: '1px solid #ddd'
                            }}
                        >

                            <RichText
                                tagName="h5"
                                placeholder="Testimonial quote…"
                                value={item.quote}
                                onChange={(value) =>
                                    updateTestimonial(index, 'quote', value)
                                }
                            />
                        </div>
                    ))}

                    <Button variant="primary" onClick={addTestimonial}>
                        Add Testimonial
                    </Button>
                </PanelBody>
            </InspectorControls>

            {/* EDITOR PREVIEW */}
            <div {...blockProps}>

                <h3>Testimonials Preview</h3>

                {testimonials.map((item, index) => (
                    <div key={index} className="testimonial-preview">
                        <p>{item.quote}</p>
                    </div>
                ))}
            </div>
        </>
    );
}