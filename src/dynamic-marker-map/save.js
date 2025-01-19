/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */

export default function save({ attributes }) {
    const { mapImageUrl, markerIconUrl, locations } = attributes;

    return (
        <div {...useBlockProps.save()}>
            <div className="map-container">
                {mapImageUrl && <img src={mapImageUrl} alt="Map" />}
                <div className="markers">
                    {locations.map((location, index) => (
                        <a
                            key={index}
                            href={location.url || '#'}
                            className="marker"
                            style={{
                                top: location.top,
                                left: location.left,
                                backgroundImage: `url(${markerIconUrl})`,
                            }}
                            target="_parent"
                            rel="noopener noreferrer"
                        >
                            <span className="tooltip">{location.tooltip}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}


