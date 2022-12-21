import { useEffect, useState } from "react";
import axios from "axios";
import { ButtonGroup, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import albumApi from "../../api/album.api";
import ModalEditAlbum from "./ModalEditAlbum";

function HomePage({ user }) {

    const [albums, setAlbums] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);

    const toggleConfirmModal = (AlbumId) => {
        setDeleteItemId(AlbumId);
    }

    const onRemoveBtn = async () => {
        const respone = await axios.delete(`https://jsonplaceholder.typicode.com/albums/${deleteItemId}`);
        const newAlbums = albums.filter((item) => item.id !== deleteItemId);
        toggleConfirmModal(null);
        setAlbums(newAlbums);
    }

    const onEditItem = (item) => {
        setEditItem(item)
    }

    const updateAlbum = async (newAlbum) => {
        const response = await albumApi.update(editItem.id, newAlbum);
        console.log(response);
        closeModalEdit();
    }

    const closeModalEdit = () => setEditItem(null);

    const renderAlbums = albums.map((item) => <tr key={item.id}>
        <th scope="row">
            <Link to={`album/${item.id}`}> {item.id}</Link>
        </th>
        <td>
            {item.title}
        </td>
        <td>
            <ButtonGroup>
                <Button color="primary" onClick={(e) => { onEditItem(item) }}>
                    Edit
                </Button>
                <Button color="info" onClick={(e) => { toggleConfirmModal(item.id) }} >
                    Delete
                </Button>
            </ButtonGroup>
        </td>
    </tr>)

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await albumApi.getAll(user);
            setAlbums(response.data);
        }
        fetchPosts();
    }, [user]);

    return <div>
        <Table>
            <thead>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        Title
                    </th>
                </tr>
            </thead>
            <tbody>
                {renderAlbums}
            </tbody>
        </Table>
        <ConfirmModal
            isOpen={deleteItemId !== null}
            title="Delete Album"
            onSubmit={onRemoveBtn}
            toggle={toggleConfirmModal}
            submitText={'Delete'}
            color="success"
        >
            <div className="text-danger"> Delete Album have ID: {deleteItemId}</div>
        </ConfirmModal>
        <ModalEditAlbum editItem={editItem} closeModal={() => { setEditItem(null) }} updateAlbum={updateAlbum} />
    </div>

};

export default HomePage;