import { initGallery } from "../components/gallery.js"

export function initOneProject() {
    const images = [
    'img/gallery/gallery-photo1.png',
    'img/gallery/gallery-photo2.png',
    'img/gallery/gallery-photo3.png',
    'img/gallery/gallery-photo4.png',
    'img/gallery/gallery-photo5.png',
    ];

    initGallery('.gallery__one-project', images);
}