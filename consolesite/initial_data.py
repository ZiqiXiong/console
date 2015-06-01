from console.models import Article, Photo, Folder

text="Hello! I am Ziqi Xiong, and this is my personal website. You can explore this website using " \
                   "basic Linux commands. Type 'help' for instructions."
folder1 = Folder(name="ZQ's Website",helper_text=text)
folder1.save()

folder2 = Folder(name='portfolio',parent=folder1)
folder2.save();
folder3 = Folder(name='articles',parent=folder1)
folder3.save();
folder4 = Folder(name='about-me',parent=folder1)
folder4.save();
folder5 = Folder(name='pictures',parent=folder1)
folder5.save();

