from console.models import Article, Photo, Folder

folder1 = Folder(name="ZQ's Website")
folder1.save()

folder2 = Folder(name='portfolio',parent=folder1)
folder2.save();
folder3 = Folder(name='articles',parent=folder1)
folder3.save();
folder4 = Folder(name='about-me',parent=folder1)
folder4.save();
folder5 = Folder(name='pictures',parent=folder1)
folder5.save();

