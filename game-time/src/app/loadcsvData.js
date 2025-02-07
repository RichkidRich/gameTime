import { db } from './firebase';
import { collection, getDocs, getCollection, doc, setDoc } from 'firebase/firestore';

const csvData = `
name,min,max,input,platforms,genre,account,download,notes,link,image
Super Auto Pets,1,2,kbm,web,fun,0,0,,https://teamwoodgames.com/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/sap-ss-02.4592cbe8.jpg?alt=media&token=a44a455c-fcfa-4294-bd35-714c6fd44920
Smash Karts,2,24,kbm,web,car,0,0,,https://smashkarts.io/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/maxresdefault%20(5).jpg?alt=media&token=0b39f23c-af6e-4f7f-bd94-135fea119fe1
Spyfall,2,12,kbm,web,party,0,0,,https://spyfall.adrianocola.com/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/hq720.jpg?alt=media&token=31f007b3-0397-4314-b4ad-8eafba228ff4
Shell Shockers,2,8,kbm,web,gun,0,0,,https://shellshock.io/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/fight.jpg?alt=media&token=401bf028-bda9-4c8f-b68d-9a5c9c2d6a10
Bomb Party,2,16,kbm,web,party,0,0,,https://jklm.fun/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/maxresdefault%20(6).jpg?alt=media&token=5782b2a6-5c7f-4342-9cc9-c30d1bc0761d
Code Names,4,64,kbm,web,party,0,0,,https://codenames.game/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/1_AzozAjjfuDanbao8ve64Dg.jpg?alt=media&token=31b4933d-e299-4c1a-94dc-ef093bdd093e
JCORG,2,12,kbm,web,car,0,0,,https://jchabin.github.io/cars/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/Screenshot%202025-02-07%20125505.jpg?alt=media&token=cad4ae73-ad01-43fb-8a2c-0729142741c8
Skribblio,2,50,kbm,web,draw,0,0,,https://skribbl.io/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/thumbnail.jpg?alt=media&token=56aae3cd-a182-4cac-9d6e-37bdff042225
Gartic Phone,2,50,kbm,web,draw,0,0,,https://garticphone.com/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/hq720%20(1).jpg?alt=media&token=1a428da9-18af-4b08-9b5b-caf47ee36543
Colonist IO,2,4,kbm,web,board,0,0,,https://colonist.io/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/colonist_screenshot_normal.jpg?alt=media&token=feb6c064-7985-4970-b1d9-cef3bcf1fc37
Jstris,2,7,kbm,web,puzzle,0,0,,https://jstris.jezevec10.com/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/image4.jpg?alt=media&token=f4488a66-ac64-4ffa-ae59-14cb1139c421
1v1 lol,2,16,kbm,web,gun,0,0,,https://1v1.lol/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/capsule_616x353.jpg?alt=media&token=80e4215f-307b-481c-9446-da51f60ae074
Venge IO,2,6,kbm,web,gun,0,0,,https://venge.io/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/hq720%20(2).jpg?alt=media&token=d269023f-4d8c-4d1a-8765-ae3b959ced25
Betrayal IO,6,12,kbm,web,party,1,0,,https://betrayal.io/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/maxresdefault%20(7).jpg?alt=media&token=f68c456b-4d84-492c-8593-05df6961e4e7
Minecraft,1,50,kbm,web,fun,0,1,,https://tlauncher.org/en/,https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/download%20(2).jpg?alt=media&token=6e934143-9f6f-45b8-8701-135179e80b07
`

const csvToObjects = (csvString) => {
    const rows = csvString.trim().split('\n');
    
    const headers = rows[0].split(',').map(header => header.trim());
    
    const objects = rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim());
        const obj = {};
        
        headers.forEach((header, index) => {
            // Convert to number if the value is numeric
            const value = values[index];
            obj[header] = isNaN(value) ? value : Number(value);
        });
        
        return obj;
    });
    
    return objects;
};

const result = csvToObjects(csvData);
result.forEach(item => {
    if (item.account) {
        item.account = true
    } else {
        item.account = false
    }

    if (item.download) {
        item.download = true
    } else {
        item.download = false
    }
})

const populate = async () => {
    const item = result[0];
    const docRef = doc(db, 'games', item.name);
    await setDoc(docRef, item);
    console.log("populate succ");
}

export default populate;



