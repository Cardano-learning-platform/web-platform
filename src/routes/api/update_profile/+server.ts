import { decode } from 'base64-arraybuffer'

export const POST = async ({ locals: { userInformation, supabase }, request }) => {
    const userId = userInformation?.id;
    const avatarFile = await request.json();

    const avatarData = avatarFile.png.split('base64,')[1]
    const decodedArrayBuffer = decode(avatarData);
    const filePath = `${userId}.png`;

    const { error } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, decodedArrayBuffer, {
            upsert: true,
            contentType: 'image/png',
        });
    if (error) {
        new Response('Error uploading avatar', { status: 500 });
    } else {
        const url = `${supabase.storage.from('avatars').getPublicUrl(filePath).data.publicUrl}?version=${new Date().getTime()}`;
        return new Response(JSON.stringify({ url }), { status: 200 });
    };
}