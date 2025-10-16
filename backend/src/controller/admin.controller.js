import { Song } from "../model/song.model.js";
import { Album } from "../model/album.model.js";
import cloudinary from "../lib/cloudinary.js";



const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",

        });
        return result.secure_url;
    } catch (error) {
        console.log("Error uploading to Cloudinary", error);
        throw new Error("   Cloudinary upload failed" + error.message);
    }
}

export const createSong = async (req, res, next) => {
    try{
        if(!req.files || !req.files.audioFile){
            return res.status(400).json({message: "No file uploaded"});
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);



        // Create new song
        const song = new Song({ title, artist, audioUrl, imageUrl, duration, album: albumId || null });

        await song.save();
        
        // If albumId is provided, add song to album's songs array
        if(albumId){
            await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
        }

        res.status(201).json(song);

    } catch (error) {
        console.error(error);
        next(error);
    }
};


export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findByIde(id);

        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } });
        }

        await Song.findByIdAndDelete(id);

        res.status(204).json({ message: "Song deleted successfully" });

    } catch (error) {
        console.error("Error deleting song:", error);
        next(error); 
    }
}


export const createAlbum = async (req, res, next) => {
    try {
        if(!req.files || !req.files.imageFile){
            return res.status(400).json({message: "No image file uploaded"});
        }

        const { title, artist, releaseYear } = req.body;
        const imageFile = req.files.imageFile;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({ title, artist, releaseYear, imageUrl, songs: [] });
        await album.save();

        res.status(201).json(album);

    } catch (error) {
        console.error("Error creating album:", error);
        next(error);
    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        const album = await Album.findById(id);
        if(!album){
            return res.status(404).json({ message: "Album not found" });
        }

        // Delete all songs associated with this album
        await Song.deleteMany({ album: album._id });

        // Delete the album
        await Album.findByIdAndDelete(id);

        res.status(204).json({ message: "Album and associated songs deleted successfully" });

    } catch (error) {
        console.error("Error deleting album:", error);
        next(error);
    }
};

export const checkAdmin = async (req, res, next) => {
    try {
        res.status(200).json({ message: "You are an admin" });
    } catch (error) {
        console.error("Error checking admin:", error);
        next(error);
    }
}   