import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { imageUrl, heading, scheme } = attributes;

    const blockProps = useBlockProps.save({
        className: `sample-block ${scheme}`
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <RichText.Content className="section-heading fade-in-up" tagName="h2" value={heading} />
                <div className="img-wrapper skew fade-in-up">
                    {imageUrl && <img src={imageUrl} alt="" />}
                </div>
            </div>
        </section>
    );
}