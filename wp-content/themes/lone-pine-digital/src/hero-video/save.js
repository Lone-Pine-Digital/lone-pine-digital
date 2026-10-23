import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        videoUrl,
        heading,
        paragraph,
        button1Text,
        button1Url,
        button2Text,
        button2Url
    } = attributes;

    const blockProps = useBlockProps.save({
        className: "hero-video"
    });

    return (
        <section {...blockProps}>
            {/* Background Video */}
            {videoUrl && (
                <video
                    className="hero-video-bg"
                    src={videoUrl}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                />
            )}

            <div className="container hero-content-wrapper">
                <div className="hero-content">
                    {heading && (
                        <RichText.Content
                            tagName="h1"
                            className="hero-heading"
                            value={heading}
                        />
                    )}
                    {paragraph && (
                        <RichText.Content
                            tagName="p"
                            className="hero-paragraph"
                            value={paragraph}
                        />
                    )}
                    <div className="hero-buttons">
                        {button1Text && (
                            <a
                                href={button1Url || "#"}
                                className="btn btn-secondary"
                            >
                                {button1Text}
                            </a>
                        )}
                        {button2Text && (
                            <a
                                href={button2Url || "#"}
                                className="btn btn-secondary"
                            >
                                {button2Text}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}