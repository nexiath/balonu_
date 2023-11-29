-- Active: 1701253661279@@127.0.0.1@5432@postgres@public
DROP TABLE IF EXISTS reserve, affectationVol, affectationMontgolfiere, vend, affectationStand, est, produit, stand, categorie_stand,vol, utilisateur, dater, emplacement, categorie, couleur, planning, parcours, montgolfiere, role CASCADE;

CREATE TABLE role (
   id_role SERIAL PRIMARY KEY,
   libelle_role VARCHAR(50) NOT NULL
);

CREATE TABLE montgolfiere (
   id_montgolfiere SERIAL PRIMARY KEY,
   nombre_place INT,
   libelle_montgolfiere VARCHAR(50),
   photo_montgolfiere VARCHAR(255),
   montgolfiere_est_active BOOLEAN
);

CREATE TABLE parcours (
   id_parcours SERIAL PRIMARY KEY,
   libelle_parcours VARCHAR(50),
   distance_parcours INT,
   duree_parcours VARCHAR(50)
);

CREATE TABLE planning (
   id_planning SERIAL PRIMARY KEY,
   date_debut TIMESTAMP,
   date_fin TIMESTAMP
);

CREATE TABLE couleur (
   id_couleur SERIAL PRIMARY KEY,
   libelle_couleur VARCHAR(50)
);

CREATE TABLE categorie (
   id_categorie SERIAL PRIMARY KEY,
   libelle_categorie VARCHAR(50),
   description_categorie VARCHAR(500)
);

CREATE TABLE emplacement (
   id_emplacement SERIAL PRIMARY KEY,
   libelle_emplacement VARCHAR(50),
   capacite_emplacement INT,
   caracteristique_emplacement VARCHAR(500),
   point_eau_nombre INT,
   prise_nombre INT,
   coordonnee_x DOUBLE PRECISION,
   coordonnee_y DOUBLE PRECISION
);

CREATE TABLE dater (
   id_date_reservation SERIAL PRIMARY KEY,
   date_reservation DATE
);

CREATE TABLE utilisateur (
   id_utilisateur SERIAL PRIMARY KEY,
   login_utilisateur VARCHAR(50),
   mot_de_passe_utilisateur VARCHAR(50),
   nom_utilisateur VARCHAR(50),
   prenom_utilisateur VARCHAR(50),
   mail_utilisateur VARCHAR(50),
   telephone_utilisateur VARCHAR(50),
   siret_utilisateur VARCHAR(50),
   id_role INT NOT NULL,
   FOREIGN KEY(id_role) REFERENCES role(id_role)
);

CREATE TABLE vol (
   id_vol SERIAL PRIMARY KEY,
   prix_vol DECIMAL(15,2),
   libelle_vol VARCHAR(50),
   avis_vol VARCHAR(50),
   id_montgolfiere INT,
   id_parcours INT,
   id_planning INT,
   FOREIGN KEY(id_montgolfiere) REFERENCES montgolfiere(id_montgolfiere),
   FOREIGN KEY(id_parcours) REFERENCES parcours(id_parcours),
   FOREIGN KEY(id_planning) REFERENCES planning(id_planning)
);

CREATE TABLE categorie_stand (
   id_categorie_stand SERIAL PRIMARY KEY,
   libelle_categorie_stand VARCHAR(50)
   );

CREATE TABLE stand (
   id_stand SERIAL PRIMARY KEY,
   libelle_stand VARCHAR(50),
   description_stand VARCHAR(500),
   image_stand TEXT,
   id_emplacement INT,
   id_categorie_stand INT,
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(id_categorie_stand) REFERENCES categorie_stand(id_categorie_stand)
);


CREATE TABLE produit (
   id_produit SERIAL PRIMARY KEY,
   libelle_produit VARCHAR(50),
   stock_produit INT,
   prix_produit DECIMAL(15,2),
   description_produit VARCHAR(500),
   quantite_produit INT,
   image_produit VARCHAR(250),
   id_categorie INT,
   FOREIGN KEY(id_categorie) REFERENCES categorie(id_categorie)
);

CREATE TABLE est (
   id_montgolfiere INT,
   id_couleur INT,
   PRIMARY KEY(id_montgolfiere, id_couleur),
   FOREIGN KEY(id_montgolfiere) REFERENCES montgolfiere(id_montgolfiere),
   FOREIGN KEY(id_couleur) REFERENCES couleur(id_couleur)
);

CREATE TABLE affectationStand (
   id_utilisateur INT,
   id_stand INT,
   PRIMARY KEY(id_utilisateur, id_stand),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand)
);

CREATE TABLE vend (
   id_stand INT,
   id_produit INT,
   PRIMARY KEY(id_stand, id_produit),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand),
   FOREIGN KEY(id_produit) REFERENCES produit(id_produit)
);

CREATE TABLE affectationMontgolfiere (
   id_utilisateur INT,
   id_montgolfiere INT,
   PRIMARY KEY(id_utilisateur, id_montgolfiere),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
   FOREIGN KEY(id_montgolfiere) REFERENCES montgolfiere(id_montgolfiere)
);

CREATE TABLE affectationVol (
   id_utilisateur INT,
   id_vol INT,
   PRIMARY KEY(id_utilisateur, id_vol),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
   FOREIGN KEY(id_vol) REFERENCES vol(id_vol)
);

CREATE TABLE reserve (
   id_utilisateur INT,
   id_stand INT,
   id_emplacement INT,
   id_date_reservation INT,
   PRIMARY KEY(id_utilisateur, id_stand, id_emplacement, id_date_reservation),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(id_date_reservation) REFERENCES dater(id_date_reservation)
);

INSERT INTO role (libelle_role) VALUES 
('Prestataire'),
('Montgolfier'), 
('Admin');

INSERT INTO montgolfiere (nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active) VALUES 
(4, 'Aurore', 'https://www.novo-monde.com/app/uploads/2019/06/montgolfiere-cappadoce.jpg', TRUE),
(6, 'Céleste', 'https://alpinemag.fr/wp-content/uploads/2022/11/valentin_delluc-scaled.jpg', FALSE),
(6, 'Céleste', 'https://alpinemag.fr/wp-content/uploads/2022/11/valentin_delluc-scaled.jpg', FALSE),
(6, 'Céleste', 'https://alpinemag.fr/wp-content/uploads/2022/11/valentin_delluc-scaled.jpg', FALSE);

INSERT INTO parcours (libelle_parcours, distance_parcours, duree_parcours) VALUES 
('Parcours du lever de soleil', 15, '3 heures'), 
('Voyage au crépuscule', 20, '4 heures');

INSERT INTO planning (date_debut, date_fin) VALUES 
('2023-12-01', '2023-12-01');

INSERT INTO couleur (libelle_couleur) VALUES 
('Bleu ciel'), 
('Vert prairie');

INSERT INTO categorie (id_categorie,libelle_categorie, description_categorie) VALUES
(1,'Vêtement', 'Vêtements thématiques et souvenirs'),
(2,'Accessoire', 'Accessoires de voyage et gadgets'),
(3,'Burger', 'Tout type de burger'),
(4,'Boisson', 'Boisson rafraichissante');

INSERT INTO emplacement (libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre, coordonnee_x, coordonnee_y) VALUES
('Point de vue nord', 100, 'Vue panoramique sur la vallée', 2, 1, 38.657497324, 34.836729986),
('Aire de repos sud', 30, 'Zone de détente et de pique-nique', 3, 4, 38.658697324, 34.835629986);


INSERT INTO dater (date_reservation) VALUES 
('2023-12-10'), 
('2023-12-24');

INSERT INTO utilisateur (login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role) VALUES 
('administrateur', 'administrateur', 'admin', 'admin', 'admin@balonu.com', '0000000000', '00000000000000', 3),
('alice123', 'alice123', 'Alicia', 'Alice', 'alice@example.com','05166164145', '1234567891234', 2),
('presta', 'presta', 'Builder', 'Bob', 'bob@example.com','0356985521', '1234567891234', 1),
('presta2', 'presta2', 'Nom1', 'Prenom1', 'email1@example.com', '0123456789', '12345678901234', 1),
('presta3', 'presta3', 'Nom1', 'Prenom1', 'email1@example.com', '0123456789', '12345678901234', 1);

INSERT INTO vol (prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning) VALUES 
(250.00, 'Vol panoramique', 'Vue imprenable', 1, 1, 1), 
(300.00, 'Expédition aérienne', 'Aventure inoubliable', 2, 2, 1);

INSERT INTO categorie_stand (libelle_categorie_stand) VALUES 
('Restauration'), 
('Boutique');

INSERT INTO stand (libelle_stand, description_stand, image_stand,id_emplacement,id_categorie_stand) VALUES 
('Boutique de souvenirs', 'Souvenirs et cadeaux uniques','https://www.novo-monde.com/app/uploads/2019/06/montgolfiere-cappadoce.jpg' ,1,1), 
('Café aérien', 'Café et en-cas légers','https://www.novo-monde.com/app/uploads/2019/06/montgolfiere-cappadoce.jpg' ,2,2),
('Restaurant panoramique', 'Cuisine raffinée avec vue imprenable','https://www.les-suites-du-nevada.com/wp-content/uploads/2021/09/restaurant-panoramic-tignes-1.jpg' ,2,1), 
('Bar à ciel ouvert', 'Boissons rafraîchissantes et ambiance détendue','https://www.batiactu.com/images/auto/620-465-c/20101018_152201_mumbaiiiiii.jpg' ,1,1),
('Bibliothèque des Nuages', 'Des livres volants et des histoires en altitude', 'https://media.admagazine.fr/photos/63207bb614420dbf05ebc6b1/16:9/w_2560%2Cc_limit/La%2520salle%2520Ovale%2520re%25CC%2581nove%25CC%2581e%2520%25C2%25A9%2520Jean-Christophe%2520Ballot%2520-%2520BnF%2520-%2520Oppic.jpg', 1, 2),
('Salon de Thé des Nuages', 'Thés et pâtisseries avec vue céleste', 'https://www.lejardindemademoiselle-salondethe.com/wp-content/uploads/2022/07/salon-de-the-cadre.jpg', 1, 1);


INSERT INTO produit (libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, image_produit,id_categorie) VALUES
('SefriteBurger', 50, 15.00, '', 1, 'https://static.wixstatic.com/media/e79818_9de4daf6a6d14c31a2f8ba3af331c85b~mv2.jpg/v1/crop/x_0,y_795,w_5548,h_3957/fill/w_602,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/V%C3%A9g%C3%A9tarien.jpg',3),
('Coca', 30, 11.00, '', 1, 'https://static-resto.bewaps.com/data/61/produits/17180-18-large.jpg',4),
('Orangina', 20, 12.00, '', 1, 'https://www.maitre-georges.com/6624-large_default/caisse-orangina-25-cl-vc-boissons-gazeuse.jpg',4),
('apayan', 1, 1.00, '', 1, 'https://www.offcourses.net/9466-large_default/boisson-gazeuse-4-agrumes.jpg',4),
('ApayanBurger', 4, 5.00, '', 1, 'https://www.picard.fr/dw/image/v2/AAHV_PRD/on/demandware.static/-/Sites-catalog-picard/default/dw9ecaa28b/recettes/R1840.png?sw=672&sh=392',3),
('Lucaburger', 1, 150.00, '', 1, 'https://www.socopa.fr/wp-content/uploads/2023/05/bao-burger-1.jpg',3),
('T-shirt Blue Lock', 10, 999.00, '', 1, 'https://cdn.discordapp.com/attachments/1151795774905135114/1168193363787391036/image.png?ex=6550dfd9&is=653e6ad9&hm=0d001854f2db6e83d81a5938e475274d921de2955f08764b0ef0673074d8b193&',1),
('Casquette Türkiye', 5, 1587.00, '', 1, 'https://cdn.discordapp.com/attachments/1151795774905135114/1168193632478699580/image.png?ex=6550e019&is=653e6b19&hm=1a73626f3aa7c1fd48e17b6cb4444e437ac357329f55bcea3d1f2d35a006b271&',1),
('porte-clé montgol', 29, 13.00, '', 1, 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/8e2b5537ae403a546d10e0da832c09bc.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp',2),
('Jouet montgolfiere', 53, 55.00, '', 1, 'https://ae01.alicdn.com/kf/S250654063c7349ce99a19752e2707af0p.jpg_640x640Q90.jpg_.webp',2);

INSERT INTO est (id_montgolfiere, id_couleur) VALUES 
(1, 1), 
(2, 2);

INSERT INTO affectationStand (id_utilisateur, id_stand) VALUES 
(1, 1), 
(3, 3), 
(3, 4), 
(2, 2),
(4,5),
(5,6);

INSERT INTO vend (id_stand, id_produit) VALUES 
(1, 1), 
(2, 2),
(2 ,1);

INSERT INTO affectationMontgolfiere (id_utilisateur, id_montgolfiere) VALUES 
(1, 1), 
(2, 2);

INSERT INTO affectationVol (id_utilisateur, id_vol) VALUES 
(1, 1), 
(2, 2);

INSERT INTO reserve (id_utilisateur, id_stand, id_emplacement, id_date_reservation) VALUES 
(1, 1, 1, 1), 
(2, 2, 2, 2);


INSERT INTO utilisateur (login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role) 
VALUES ('login1', 'password1', 'Nom1', 'Prenom1', 'email1@example.com', '0123456789', '12345678901234', 1);

INSERT INTO utilisateur (login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role) 
VALUES ('login2', 'password2', 'Nom2', 'Prenom2', 'email2@example.com', '9876543210', '23456789012345', 2);


INSERT INTO couleur (libelle_couleur) VALUES ('Rouge');
INSERT INTO couleur (libelle_couleur) VALUES ('Vert');
INSERT INTO couleur (libelle_couleur) VALUES ('Bleu');
INSERT INTO couleur (libelle_couleur) VALUES ('Jaune');
INSERT INTO couleur (libelle_couleur) VALUES ('Noir');

